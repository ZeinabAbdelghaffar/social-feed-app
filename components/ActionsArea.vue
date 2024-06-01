<template>
  <div class="actions-area">
    <v-row>
      <v-col>
        <div class="reaction">
          <v-btn icon @click="incrementReaction('likes')">
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <span>{{ localPost.reactions.likes }}</span>
        </div>
      </v-col>
      <v-col>
        <div class="reaction">
          <v-btn icon @click="incrementReaction('dislikes')">
            <v-icon>mdi-thumb-down-outline</v-icon>
          </v-btn>
          <span>{{ localPost.reactions.dislikes }}</span>
        </div>
      </v-col>
      <v-col>
        <v-btn outlined @click="showCommentInput">Comment</v-btn>
      </v-col>
      <v-col>
        <v-btn outlined @click="sharePost">Share</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { updateReactionCount } from '@/services/Api';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localPost: { ...this.post } // Create a local copy of the post prop
    };
  },
  methods: {
    async incrementReaction(reactionType) {
      try {
        // Increase the corresponding reaction count locally
        this.localPost.reactions[reactionType]++;
        // Send a POST request to update the reaction count on the server
        await updateReactionCount(this.localPost.id, reactionType, this.localPost.reactions[reactionType]);
      } catch (error) {
        console.error('Failed to update reaction count:', error);
        // If there's an error, rollback the local count
        this.localPost.reactions[reactionType]--;
      }
    },
    showCommentInput() {
      // Emit an event or perform any necessary action to show comment input
    },
    sharePost() {
      // Emit an event or perform any necessary action to share the post
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
</style>
