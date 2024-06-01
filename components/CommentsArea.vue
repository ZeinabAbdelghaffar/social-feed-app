<template>
  <div class="comments-area">
    <h3>Comments</h3>
    <ul class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <p>{{ comment.body }}</p>
        <p class="comment-author">@{{ comment.user ? comment.user.username : 'Unknown' }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.comment-list {
  list-style: none;
  padding: 0;
}

.comment-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.comment-author {
  font-style: italic;
  color: #666;
}
</style>
