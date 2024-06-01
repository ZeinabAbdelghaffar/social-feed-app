<template>
  <div class="actions-area">
    <v-row>
      <v-col>
        <div class="reaction">
          <v-btn :class="{ 'reacted': localPost.reacted === 'likes' }" icon @click="toggleReaction('likes')">
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <span>{{ localPost.reactions.likes }}</span>
        </div>
      </v-col>
      <v-col>
        <div class="reaction">
          <v-btn :class="{ 'reacted': localPost.reacted === 'dislikes' }" icon @click="toggleReaction('dislikes')">
            <v-icon>mdi-thumb-down-outline</v-icon>
          </v-btn>
          <span>{{ localPost.reactions.dislikes }}</span>
        </div>
      </v-col>
      <v-col>
        <v-btn outlined @click="toggleWriteComment">Comment</v-btn>
        <v-slide-y-transition>
          <div v-if="showWriteComment">
            <textarea v-model="newComment" rows="4" cols="50"></textarea>
            <v-btn @click="addCommentLocally">Add Comment</v-btn>
          </div>
        </v-slide-y-transition>
      </v-col>
      <v-col>
        <v-btn outlined @click="showShareModal = true">Share</v-btn>
        <v-dialog v-model="showShareModal" max-width="500px">
          <v-card>
            <v-card-title>Share Post</v-card-title>
            <v-card-text>
              <p>URL: {{ postUrl }}</p>
              <v-btn @click="copyUrlToClipboard">Copy URL</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
      showShareModal: false,
    };
  },
  computed: {
    postUrl() {
      return window.location.href;
    }
  },
  methods: {
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
      const urlInput = document.createElement('textarea');
      urlInput.value = this.postUrl;
      document.body.appendChild(urlInput);
      urlInput.select();
      document.execCommand('copy');
      document.body.removeChild(urlInput);
    }
  }
};
</script>

<style scoped>
.actions-area {
  margin-bottom: 20px;
}
.reaction {
  display: flex;
  align-items: center;
}
.reacted {
  background-color: #e0e0e0;
}
</style>
