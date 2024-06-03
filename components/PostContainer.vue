<template>
  <v-card class="post-container">
    <CreatorArea :creator="post.creator" :title="post.title" :content="post.body" />
    <ActionsArea :post="post" />
    <CommentsArea :comments="post.comments" />
    <ShareModal />
  </v-card>
</template>

<script>
import CreatorArea from './CreatorArea.vue';
import ActionsArea from './ActionsArea.vue';
import CommentsArea from './CommentsArea.vue';

export default {
  components: {
    CreatorArea,
    ActionsArea,
    CommentsArea,
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.post-container {
  border: 1px solid #FF9800;
  border-radius: 6px;
  padding: 16px;
  margin: 50px;
  transition: box-shadow 0.3s ease;
}

.post-container:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
