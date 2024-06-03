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
    .then(response => {
      const comments = response.data.comments;
      const commentPromises = comments.map(async comment => {
        try {
          const user = await fetchUser(comment.user.id);
          console.log('User ID:', user.id);
          comment.user.image = user.image;
          comment.user.id = user.id; 
          return comment;
        } catch (error) {
          console.error('Error fetching user:', error);
          return null; 
        }
      });
      return Promise.all(commentPromises)
        .then(commentsWithImage => ({ comments: commentsWithImage.filter(comment => comment !== null) }));
    })
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
