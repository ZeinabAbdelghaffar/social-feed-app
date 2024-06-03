<template>
  <div class="actions-area">
    <v-row class="actions-row">
      <v-col cols="1">
        <div class="reaction">
          <v-btn :class="{ 'reacted': localPost.reacted === 'likes' }" small icon @click="toggleReaction('likes')">
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <span>{{ localPost.reactions.likes }}</span>
        </div>
      </v-col>
      <v-col cols="1">
        <div class="reaction">
          <v-btn :class="{ 'reacted': localPost.reacted === 'dislikes' }" small icon @click="toggleReaction('dislikes')">
            <v-icon>mdi-thumb-down-outline</v-icon>
          </v-btn>
          <span>{{ localPost.reactions.dislikes }}</span>
        </div>
      </v-col>
      <v-col cols="1">
        <v-btn outlined class="comment-btn" @click="showCommentInput">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-slide-y-transition>
          <div v-if="showWriteComment">
            <v-btn @click="addCommentLocally">Add Comment</v-btn>
          </div>
        </v-slide-y-transition>
      </v-col>
      <v-col cols="1">
        <v-btn outlined class="share-btn" @click="sharePost">
          <v-icon>mdi-share-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div v-if="urlCopied" class="url-copied-message">Post URL has been copied to your clipboard!</div>
  </div>
</template>

<script>
import { EventBus } from '@/services/eventBus';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localPost: { ...this.post, reacted: null, comments: [] },
      showWriteComment: false,
      newComment: '',
      urlCopied: false 
    };
  },
  computed: {
    postUrl() {
      return window.location.href;
    }
  },
  methods: {
    showCommentInput() {
      EventBus.$emit('show-comment-input');
    },
    toggleWriteComment() {
      this.showWriteComment = !this.showWriteComment;
    },
    addCommentLocally() {
      if (this.newComment.trim() !== '') {
        this.localPost.comments.push(this.newComment);
        this.newComment = '';
      }
    },
    copyUrlToClipboard() {
      const randomNumber = Math.floor(Math.random() * 30) + 1;
      const dynamicUrl = `https://dummyjson.com/posts/${randomNumber}`;
      const urlInput = document.createElement('textarea');
      urlInput.value = dynamicUrl;
      document.body.appendChild(urlInput);
      urlInput.select();
      document.execCommand('copy');
      document.body.removeChild(urlInput);
      this.urlCopied = true;
      window.open(dynamicUrl, '_blank');
      setTimeout(() => {
        this.urlCopied = false;
      }, 3000);
    },
    toggleReaction(reactionType) {
      if (this.localPost.reacted === reactionType) {
        this.localPost.reactions[reactionType]--;
        this.localPost.reacted = null;
      } else {
        if (this.localPost.reacted) {
          this.localPost.reactions[this.localPost.reacted]--;
        }
        this.localPost.reactions[reactionType]++;
        this.localPost.reacted = reactionType;
      }
    },
    sharePost() {
      this.copyUrlToClipboard();
    }
  }
};
</script>

<style scoped>
.actions-area {
  margin: 20px;
}
.actions-row {
  display: flex;
  justify-content: space-between;
}
.reaction {
  display: flex;
  align-items: center;
}
.reacted {
  background-color: #FF9800;
  color: #FFF;
  border: none;
}
.comment-btn{
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  border: none;
}
.share-btn {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  border: none;
}
.url-copied-message{
  width: 100%;
  text-align: center;
  background-color: #FF9800;
}
</style>