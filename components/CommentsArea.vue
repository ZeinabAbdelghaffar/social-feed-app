<template>
  <v-container class="comments-area">
    <template v-if="comments.length > 0">
      <v-list style="max-height: 300px; overflow-y: auto;">
        <v-list-item v-for="comment in visibleComments" :key="comment.id">
          <v-list-item-avatar v-if="comment.user.image" :src="comment.user.image"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="comment-author">
              {{ comment.user.fullName }} @{{ comment.user.username }}
            </v-list-item-title>
            <v-list-item-subtitle class="comment-text">{{ comment.body }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon class="reaction-btn" @click="reactToComment(comment.id)">
              <v-icon>mdi-thumb-up-outline</v-icon>
            </v-btn>
            <span>{{ comment.likes }} likes</span>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon class="share-btn" @click="shareComment(comment.id)">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <a v-if="visibleComments.length < comments.length" class="view-more-comments" @click.prevent="viewMoreComments">
        View more comments
      </a>      
      <p v-else-if="visibleComments.length === comments.length" class="no-more-comments">No more comments to load.</p>
    </template>
    <template v-else>
      <p class="no-comments">No comments available.</p>
    </template>
  </v-container>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentCommentIndex: 2,
      userImages: {},
      commentLikes: {} 
    };
  },
  computed: {
    visibleComments() {
      return this.comments.slice(0, this.currentCommentIndex).map(comment => ({
        ...comment,
        user: {
          ...comment.user,
          image: this.userImages[comment.user.id]
        },
        likes: this.commentLikes[comment.id] || 0 
      }));
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        await Promise.all([
          this.fetchUserImages(),
          this.fetchCommentLikes()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchUserImages() {
      try {
        const userIds = this.comments.map(comment => comment.user.id);
        const responses = await Promise.all(userIds.map(userId => fetch(`https://dummyjson.com/users/${userId}`)));
        const userData = await Promise.all(responses.map(response => response.json()));
        userData.forEach(data => {
          this.$set(this.userImages, data.id, data.image);
        });
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    },
    async fetchCommentLikes() {
      try {
        const commentIds = this.comments.map(comment => comment.id);
        const responses = await Promise.all(commentIds.map(commentId => fetch(`https://dummyjson.com/comments/${commentId}/likes`)));
        const likesData = await Promise.all(responses.map(response => response.json()));
        likesData.forEach(data => {
          this.$set(this.commentLikes, data.id, data.likes);
        });
      } catch (error) {
        console.error('Error fetching comment likes:', error);
      }
    },
    reactToComment(commentId) {
      // Add your logic here
    },
    shareComment(commentId) {
      // Add your logic here
    },
    viewMoreComments() {
      this.currentCommentIndex += 3;
      if (this.currentCommentIndex > this.comments.length) {
        this.currentCommentIndex = this.comments.length;
      }
    }
  }
};
</script>

<style scoped>
.comments-area {
  margin-bottom: 20px;
}

.comment-author {
  font-weight: bold;
}

.comment-text {
  color: #333;
}

.view-more-comments {
  margin-left: 15px;
  color: #007bff !important; 
  cursor: pointer;
  text-decoration: underline;
}

.view-more-comments:hover {
  color: #0056b3 !important;
}

.no-more-comments {
  margin-top: 10px;
  background-color: #FF9800;
}

.reaction-btn, .share-btn {
  margin-right: 8px;
}
</style>