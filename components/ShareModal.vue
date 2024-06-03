<template>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title>Share Post</v-card-title>
      <v-card-text>
        <p>URL: {{ postUrl }}</p>
        <v-btn @click="copyUrlToClipboard">
          <v-icon>mdi-content-copy</v-icon>
          Copy
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="showModal = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    postUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    copyUrlToClipboard() {
      const urlInput = document.createElement('textarea');
      urlInput.value = this.postUrl;
      document.body.appendChild(urlInput);
      urlInput.select();
      document.execCommand('copy');
      document.body.removeChild(urlInput);
      alert('URL copied to clipboard');
    }
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
