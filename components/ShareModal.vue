<template>
  <div v-if="showModal" class="share-modal">
    <!-- Add your modal content here -->
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}) 
    }
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
.share-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
}
</style>
