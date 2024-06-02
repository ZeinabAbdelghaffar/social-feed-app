<template>
  <div class="feed-page">
    <SiteHeader />
    <div>
      <h2>{{ visiblePosts.length }} Feeds</h2>
      <ul>
        <li v-for="post in visiblePosts" :key="post.id">
          <PostContainer :post="post" />
        </li>
      </ul>
      <p v-if="isLoading">Loading more posts...</p>
      <p v-else-if="!allPostsLoaded">Scroll down to load more posts.</p>
      <p v-else-if="!hasPosts">No New Posts</p>
      <p v-else>No more posts to load.</p>
    </div>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/HeaderArea.vue'; 
import SiteFooter from '@/components/FooterArea.vue'; 
import PostContainer from '@/components/PostContainer.vue';
import { fetchPosts, fetchUser, fetchComments } from '@/services/Api';

export default {
  components: {
    SiteHeader,
    SiteFooter,
    PostContainer
  },
  data() {
    return {
      posts: [],
      visiblePosts: [],
      postLimit: 10,
      isLoading: false,
      allPostsLoaded: false
    };
  },computed: {
    hasPosts() {
      return this.visiblePosts.length > 0;
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
    await this.loadPosts();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async loadPosts() {
  try {
    this.isLoading = true;
    const posts = await fetchPosts(this.posts.length, 1); // Fetch one post
    if (posts.length > 0) {
      const post = posts[0];
      const postDetails = await this.loadPostDetails(post);
      this.posts.push(postDetails);
      this.visiblePosts.push(postDetails);

      // Check if the number of posts reaches 30
      if (this.posts.length === 30) {
        // Display "No New Posts" message
        this.allPostsLoaded = true;
      }
    } else {
      this.allPostsLoaded = true;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    this.isLoading = false;
  }
},

    async loadPostDetails(post) {
      try {
        const user = await fetchUser(post.userId);
        const creator = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          image: user.image
        };

        const commentsResponse = await fetchComments(post.id);
        const comments = commentsResponse.comments.map(comment => ({
          id: comment.id,
          body: comment.body,
          user: {
            username: comment.user.username,
            fullName: comment.user.fullName,
            image: comment.user.image
          }
        }));

        return {
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          creator,
          reactions: post.reactions,
          comments
        };
      } catch (error) {
        console.error('Error loading post details:', error);
        return null;
      }
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.scrollHeight;
      if (scrollPosition >= pageHeight && !this.isLoading && !this.allPostsLoaded) {
        this.loadPosts();
      }
    }
  }
};
</script>

<style scoped>
.feed-page h2 {
  margin: 50px; 
  background-color: #FF9800;
  line-height: 50px;
}
</style>