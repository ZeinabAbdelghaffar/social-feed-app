<template>
  <v-card class="creator-area">
    <v-row align="center">
      <v-col cols="2">
        <v-avatar size="100">
          <img :src="creator.image" alt="Creator Image">
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <div class="creator-info">
          <p class="creator-name">{{ creator.firstName }} {{ creator.lastName }}</p>
          <p class="creator-username">@{{ creator.username }}</p>
          <h2 class="post-title">{{ title }}</h2>
          <p class="post-content">{{ content }}</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    creator: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
};
</script>