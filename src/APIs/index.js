import axios from "axios";

const URL = "http://localhost:5000";

export const fecthPosts = () => axios.get(`${URL}/post`);

export const createPost = (payload) =>
  axios.post(`${URL}/post/addPost`, payload);

export const updatePost = (payload) =>
  axios.patch(`${URL}/post/updatePost`, payload);

export const deletePost = (payload) =>
  axios.delete(`${URL}/post/deletePost/${payload.postID}`);
