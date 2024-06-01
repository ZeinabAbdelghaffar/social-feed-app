import Vue from 'vue';
import Router from 'vue-router';
import FeedPage from '@/pages/FeedPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FeedPage',
      component: FeedPage
    }
  ]
});