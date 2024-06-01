<template>
  <v-card class="post-container">
    <CreatorArea :creator="post.creator" :title="post.title" :content="post.body" />
    <ActionsArea :post="post" />
    <CommentsArea :comments="post.comments" />
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
    CommentsArea
  },
  props: {
    post: {
      type: Object,
      default: () => ({ creator: {}, title: '', body: '', reactions: { likes: 0, dislikes: 0 }, comments: [] })
    }
  }
};
</script>

<style scoped>
.post-container {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.post-container:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>