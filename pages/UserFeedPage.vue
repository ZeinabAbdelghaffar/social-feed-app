<template>
  <div class="user-feed-page">
    <SiteHeader />
    <div>
      <h2>{{ visiblePosts.length }} Feeds</h2>
      <ul>
        <li v-for="post in visiblePosts" :key="post.id">
          <PostContainer :post="post" />
        </li>
      </ul>
      <div v-if="isLoading" class="loading-container">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading more posts...</p>
      </div>
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
import { fetchPostsByUser, fetchUser, fetchComments } from '@/services/Api';

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
      allPostsLoaded: false,
      userId: null 
    };
  },
  computed: {
    hasPosts() {
      return this.visiblePosts.length > 0;
    }
  },
  async created() {
    this.userId = this.$route.params.userId; 
    await this.loadPosts();
  },
  methods: {
    async loadPosts() {
      try {
        this.isLoading = true;
        const posts = await fetchPostsByUser(this.userId); 
        if (posts.length > 0) {
          this.posts.push(...posts);
          this.visiblePosts.push(...posts);
          if (this.posts.length === 30) {
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
.user-feed-page h2 {
  margin-top: 20px;
  margin-bottom: -20px;
  margin-left: 50px; 
  margin-right: 50px; 
  background-color: #FF9800;
}
.user-feed-page p {
  margin-top: -25px;
  margin-bottom: 10px;
  text-align: center;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading-container i {
  font-size: 30px;
  margin-right: 200px;
}
</style>