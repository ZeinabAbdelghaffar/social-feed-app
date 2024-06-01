import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const fetchPosts = (skip = 0, limit = 30) => {
  return axios.get(`${API_URL}/posts`, { params: { skip, limit } })
    .then(response => {
      if (response.data && response.data.posts) {
        return response.data.posts; 
      } else {
        throw new Error('No posts found');
      }
    })
    .catch(error => {
      throw error;
    });
};

export const fetchUser = (id) => {
  return axios.get(`${API_URL}/users/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const fetchComments = (postId, skip = 0, limit = 5) => {
  return axios.get(`https://dummyjson.com/comments/post/${postId}`, { params: { skip, limit } })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const updateReactionCount = (postId, reactionType, count) => {
  return axios.post(`${API_URL}/update-reaction`, { postId, reactionType, count })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}