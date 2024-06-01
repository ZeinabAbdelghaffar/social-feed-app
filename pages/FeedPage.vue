<template>
  <div class="feed-page">
    <SiteHeader />
    <div>
      <ul v-if="posts.length > 0">
        <li v-for="post in posts" :key="post.id">
          <PostContainer :post="post" />
        </li>
      </ul>
      <CommentsArea v-if="posts.length > 0" :comments="posts.flatMap(post => post.comments)" />
      <p v-else>No posts found.</p>
    </div>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/HeaderArea.vue'; 
import SiteFooter from '@/components/FooterArea.vue'; 
import PostContainer from '@/components/PostContainer.vue';
import CommentsArea from '@/components/CommentsArea.vue';
import { fetchPosts, fetchUser, fetchComments } from '@/services/Api';

export default {
  components: {
    SiteHeader,
    SiteFooter,
    PostContainer,
    CommentsArea
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
    async loadPosts() {
      try {
        const posts = await fetchPosts();
        this.posts = posts.map(post => ({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          creator: {},
          reactions: post.reactions,
          comments: []
        }));
        this.loadPostDetails();
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async loadPostDetails() {
      const promises = this.posts.map(async (post) => {
        try {
          const user = await fetchUser(post.userId);
          post.creator = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            image: user.image
          };
        } catch (error) {
          console.error('Error fetching user details:', error);
        }

        try {
          const commentsResponse = await fetchComments(post.id);
          console.log('Fetched comments for post:', post.id, commentsResponse); // Debug statement
          post.comments = commentsResponse.comments.map(comment => ({
            id: comment.id,
            body: comment.body,
            user: {
              username: comment.user.username,
              fullName: comment.user.fullName,
              image: comment.user.image
            }
          }));
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      });

      try {
        await Promise.all(promises);
        this.posts = [...this.posts];
      } catch (error) {
        console.error('Error loading post details:', error);
      }
    }
  }
};
</script>