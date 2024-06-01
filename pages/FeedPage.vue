<template>
  <div class="feed-page">
    <SiteHeader />
    <div>
      <h1>Feed Page</h1>
      <ul v-if="posts.length > 0">
        <li v-for="post in posts" :key="post.id">
          <PostContainer :post="post" />
          <!-- Add CommentsArea component here -->
          <CommentsArea :comments="post.comments" />
        </li>
      </ul>
      <p v-else>No posts found.</p>
    </div>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/HeaderArea.vue'; 
import SiteFooter from '@/components/FooterArea.vue'; 
import PostContainer from '@/components/PostContainer.vue';
import CommentsArea from '@/components/CommentsArea.vue'; // Import the CommentsArea component
import { fetchPosts, fetchUser, fetchComments } from '@/services/Api';

export default {
  components: {
    SiteHeader,
    SiteFooter,
    PostContainer,
    CommentsArea // Add the CommentsArea component to the list of imported components
  },
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.loadPosts();
  },
  methods: {
    loadPosts() {
      fetchPosts()
        .then(posts => {
          console.log('Fetched posts:', posts);
          this.posts = posts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId, // Adding userId to access it later
            creator: {}, // Placeholder for creator data
            reactions: post.reactions,
            comments: [] // Placeholder for comments
          }));
          this.loadPostDetails(); // Load creator details and comments for each post
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },
    loadPostDetails() {
      // Create an array to store all promises for user details and comments fetching
      const promises = [];

      this.posts.forEach(post => {
        // Fetch user details
        const userPromise = fetchUser(post.userId)
          .then(user => {
            post.creator = {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              image: user.image
            };
          })
          .catch(error => {
            console.error('Error fetching user details:', error);
          });

        // Fetch comments
        const commentsPromise = fetchComments(post.id)
          .then(comments => {
            post.comments = comments.map(comment => ({
              id: comment.id,
              body: comment.body,
              user: {
                username: comment.user.username,
                fullName: comment.user.fullName,
                image: comment.user.image // Add user image to comments
              }
            }));
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
          });

        // Push both promises to the array
        promises.push(userPromise, commentsPromise);
      });

      // Wait for all promises to resolve before updating the post data
      Promise.all(promises)
        .then(() => {
          // Once all promises are resolved, update the post data
          this.posts = [...this.posts];
        })
        .catch(error => {
          console.error('Error loading post details:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
