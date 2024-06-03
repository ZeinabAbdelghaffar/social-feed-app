<template>
  <v-container class="comments-area">
    <template v-if="localComments.length > 0">
      <v-list style="max-height: 300px; overflow-y: auto;">
        <v-list-item v-for="comment in visibleComments" :key="comment.id">
          <v-list-item-avatar>
            <img :src="comment.user.image" :alt="comment.user.username">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="comment-author">
              {{ comment.user.fullName }} 
            </v-list-item-title>
            <v-list-item-title class="comment-owner" @click="redirectToUserFeed(comment.user.id)">
              @{{ comment.user.username }}
            </v-list-item-title>
            <v-list-item-subtitle class="comment-text">{{ comment.body }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon class="reaction-btn" :class="{ 'reacted': reactState[comment.id] === 1 }" @click="reactToComment(comment.id)">
              <v-icon :color="reactState[comment.id] === 1 ? 'blue' : ''">mdi-thumb-up-outline</v-icon>
            </v-btn>
            <span>{{ comment.likes }} likes</span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <a v-if="visibleComments.length < localComments.length" class="view-more-comments" @click.prevent="viewMoreComments">
        View more comments
      </a>      
      <p v-else-if="visibleComments.length === localComments.length" class="no-more-comments">No more comments to load.</p>
    </template>
    <template v-else>
      <p class="no-comments">No comments available.</p>
    </template>
    <v-slide-y-transition>
      <div v-if="showCommentInput" class="comment-box">
        <textarea v-model="newComment" rows="4" placeholder="Write a comment" class="comment-input"></textarea>
        <v-btn class="add-comment-btn" @click="addCommentLocally">Add Comment</v-btn>
      </div>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { EventBus } from '@/services/eventBus';

export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localComments: [],
      showCommentInput: false,
      newComment: '',
      currentCommentIndex: 2,
      commentLikes: {},
      reactState: {}
    };
  },
  computed: {
    visibleComments() {
      return this.localComments.slice(0, this.currentCommentIndex).map(comment => ({
        ...comment,
        likes: this.commentLikes[comment.id] || 0
      }));
    }
  },
  watch: {
    comments: {
      handler(newComments) {
        this.localComments = [...newComments];
        this.initializeLikesAndState(newComments);
      },
      immediate: true
    }
  },
  created() {
    EventBus.$on('show-comment-input', this.displayCommentInput);
  },
  beforeDestroy() {
    EventBus.$off('show-comment-input', this.displayCommentInput);
  },
  methods: {
    displayCommentInput() {
      this.showCommentInput = true;
    },
    addCommentLocally() {
      if (this.newComment.trim() !== '') {
        const newComment = {
          id: this.localComments.length + 1,
          body: this.newComment,
          user: {
            id: 1,
            fullName: 'Current User',
            username: 'currentuser',
            image: 'path-to-user-image'
          }
        };
        this.localComments.unshift(newComment);
        this.$set(this.commentLikes, newComment.id, 0);
        this.$set(this.reactState, newComment.id, 0);
        
        this.newComment = '';
        this.showCommentInput = false;
      }
    },
    reactToComment(commentId) {
      if (this.reactState[commentId] === 0 || this.reactState[commentId] === undefined) {
        this.$set(this.commentLikes, commentId, (this.commentLikes[commentId] || 0) + 1);
        this.$set(this.reactState, commentId, 1);
      } else {
        this.$set(this.commentLikes, commentId, this.commentLikes[commentId] - 1);
        this.$set(this.reactState, commentId, 0);
      }
    },
    viewMoreComments() {
      this.currentCommentIndex += 3;
      if (this.currentCommentIndex > this.localComments.length) {
        this.currentCommentIndex = this.localComments.length;
      }
    },
    redirectToUserFeed(userId) {
      this.$router.push({ name: 'UserFeedPage', params: { userId } });
    },
    initializeLikesAndState(comments) {
      comments.forEach(comment => {
        this.$set(this.commentLikes, comment.id, comment.likes || 0);
        this.$set(this.reactState, comment.id, 0); // default reaction state
      });
      this.fetchCommentLikes();
    },
    async fetchCommentLikes() {
      try {
        await Promise.all(this.localComments.map(async comment => {
          const response = await fetch(`https://dummyjson.com/comments/${comment.id}`);
          const commentData = await response.json();
          if (commentData.likes !== undefined) {
            this.$set(this.commentLikes, comment.id, commentData.likes);
          } else {
            console.error(`Likes data not found for comment ${comment.id}`);
          }
        }));
      } catch (error) {
        console.error('Error fetching comment likes:', error);
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
.comment-owner {
  color: #007bff !important;
  cursor: pointer;
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
.reacted {
  background-color: #FF9800;
  color: #FFF;
  border: none;
}
.comment-box {
  margin-top: 20px;
  margin-left: 15px;
  width: 100%;
}
.comment-input {
  width: 100%;
  box-sizing: border-box;
}
.add-comment-btn {
  margin-top: 10px;
  width: 20%;
}
</style>
