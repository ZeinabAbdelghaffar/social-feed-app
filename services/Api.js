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
      const commentPromises = comments.map(comment => {
        return fetchUser(comment.user.id) 
          .then(user => {
            comment.user.image = user.image;
            return comment;
          });
      });
      return Promise.all(commentPromises)
        .then(commentsWithImage => ({ comments: commentsWithImage }));
    })
    .catch(error => { throw error; });
};

export const fetchPostsByUser = (userId) => {
  console.log('UserId in fetchPostsByUser:', userId); 
  return axios.get(`${API_URL}/posts/user/${userId}`)
    .then(response => {
      if (response.data && response.data.posts) {
        const posts = response.data.posts;
        const postPromises = posts.map(post => {
          return fetchUser(post.userId)
            .then(user => {
              post.user = {
                id: user.id,
                image: user.image
              };
              return post;
            });
        });
        return Promise.all(postPromises);
      } else {
        throw new Error('No posts found for this user');
      }
    })
    .catch(error => {
      throw error;
    });
};
