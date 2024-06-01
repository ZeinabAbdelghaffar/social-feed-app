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
import CommentsArea from './CommentsArea.vue'; // Import the CommentsArea component

export default {
  components: {
    CreatorArea,
    ActionsArea,
    CommentsArea // Include the CommentsArea component
  },
  props: {
    post: {
      type: Object,
      default: () => ({ creator: {}, title: '', body: '', reactions: { likes: 0, dislikes: 0 }, comments: [] })
    }
  }
};
</script>