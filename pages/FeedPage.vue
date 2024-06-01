<template>
  <div class="feed-page">
    <SiteHeader />
        
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/HeaderArea.vue'; 
import SiteFooter from '@/components/FooterArea.vue'; 

export default {
  components: {
    SiteHeader,
    SiteFooter
  }
};
</script>