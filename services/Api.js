import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const fetchPosts = (skip = 0, limit = 1) => {
  return axios.get(`${API_URL}/posts`, { params: { skip, limit } })
    .then(response => response.data.posts)
    .catch(error => { throw error; });
};

export const fetchUser = (id) => {
  return axios.get(`${API_URL}/users/${id}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

export const fetchComments = (postId) => {
  return axios.get(`${API_URL}/comments/post/${postId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

export const fetchPostsByUser = (userId) => {
  return axios.get(`${API_URL}/posts/user/${userId}`)
    .then(response => {
      if (response.data && response.data.posts) {
        return response.data.posts;
      } else {
        throw new Error('No posts found for this user');
      }
    })
    .catch(error => {
      throw error;
    });
};

export const fetchUserIdByUsername = (username) => {
  return axios.get(`${API_URL}/users?username=${username}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data[0].id; // Assuming there's only one user with the given username
      } else {
        throw new Error('User not found');
      }
    })
    .catch(error => {
      throw error;
    });
};
