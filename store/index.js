export const state = () => ({
  posts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  }
};

export const actions = {
  async fetchPosts({ commit }) {
    const { data } = await this.$axios.get('https://dummyjson.com/posts');
    commit('setPosts', data.posts);
  }
};
