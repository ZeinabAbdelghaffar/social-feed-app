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
          <p class="post-content" :class="{ 'limited-content': showLimitedContent }">{{ showLimitedContent ? limitedContent : content }}</p>
          <span v-if="content.length > 50 && !showFullContent">
            <a class="show-more" @click="showFullContent = true">Show More</a>
          </span>
          <span v-else-if="content.length > 50 && showFullContent">
            <a class="show-less" @click="showFullContent = false">Show Less</a>
          </span>
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
  },
  data() {
    return {
      showFullContent: false
    };
  },
  computed: {
    limitedContent() {
      if (this.content.length > 50) {
        return this.content.substring(0, 50) + '…';
      } else {
        return this.content;
      }
    },
    showLimitedContent() {
      return this.content.length > 50 && !this.showFullContent;
    }
  }
};
</script>

<style scoped>
.creator-area {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.creator-info {
  font-size: 16px;
}

.post-content {
  margin-top: 10px;
}

.limited-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.show-more,
.show-less {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.show-more:hover,
.show-less:hover {
  color: #0056b3;
}
</style>
