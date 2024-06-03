<template>
  <div class="feed-page">
    <SiteHeader />
    <div v-if="userPosts.length > 0" class="user-posts">
      <div class="user-info">
        <h2> There is {{ userPosts.length }} Feeds</h2>
        <p>User ID: {{ userId }} , UserName: @{{ userName }}</p>
        <div v-if="userImage">
          <img :src="userImage" alt="User Image">
        </div>
      </div>
      <ul class="post-list">
        <li v-for="post in userPosts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <div class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>
          <div class="reactions">
            <div class="like"><i class="fas fa-thumbs-up"></i> Likes: {{ post.reactions.likes }}</div> 
            <div class="dislike"><i class="fas fa-thumbs-down"></i> Dislikes: {{ post.reactions.dislikes }}</div> 
          </div>
        </li>
      </ul>
      <router-link to="/FeedPage" class="back-button">
        <i class="fas fa-arrow-left"></i> Back to FeedPage
      </router-link>
    </div>
    <div v-else class="no-posts">
      <p>No posts available for this user.</p>
    </div>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/HeaderArea.vue'; 
import SiteFooter from '@/components/FooterArea.vue'; 
import { fetchPostsByUser, fetchUser } from '@/services/Api'; 

export default {
  components: {
    SiteHeader,
    SiteFooter
  },  
  data() {
    return {
      userPosts: [],
      userId: '',
      userImage: '',
      userName: ''
    };
  },
  created() {
    this.userId = localStorage.getItem('userId'); 
    if (this.userId) {
      fetchUser(this.userId)
        .then(user => {
          console.log('User:', user);
          this.userImage = user.image;
          this.userName = user.username; 
        })
        .catch(error => console.error('Error fetching user:', error));
      fetchPostsByUser(this.userId)
        .then(posts => {
          console.log('User Posts from API:', posts);
          this.userPosts = posts; 
        })
        .catch(error => console.error('Error fetching user posts:', error));
    } else {
      console.error('Error: User ID not found in local storage');
    }
  }
};
</script>

<style scoped>
.feed-page {
  font-family: Arial, sans-serif;
}
.feed-page h2{
  margin: 20px 0px -15px 55px;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-info img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 50px;
  margin-top: 10px;
  border: 1px solid #FF9800;
}
.post-list {
  list-style-type: none;
  padding: 0;
}
.post-item {
  border: 1px solid #FF9800;
  border-radius: 6px;
  padding: 16px;
  margin: 20px 50px 20px 50px;
  transition: box-shadow 0.3s ease;
}
.post-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.tags {
  margin-top: 10px;
}
.tag {
  margin-right: 5px;
  background-color: #f0f0f0;
  padding: 2px 5px;
  border-radius: 5px;
}
.reactions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.no-posts {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.back-button {
  margin-bottom: 20px;
  margin-top: -20px;
  margin-left: 50px;
  padding: 10px 20px;
  background-color: transparent;
  color: #FF9800;
  border: 1px solid #FF9800;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.back-button:hover {
  background-color: rgba(0, 123, 255, 0.1);
}
.back-button i {
  margin-right: 5px;
}
</style>