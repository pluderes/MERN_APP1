import { INIT_STATE } from "../../constant";
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getType,
} from "../actions";

export default function postsReducers(state = INIT_STATE.post, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createPost.createPostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createPost.createPostSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
      };
    case getType(createPost.createPostFailure):
      return {
        ...state,
        isLoading: false,
        createPost: "idle",
      };
    case getType(updatePost.updatePostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updatePost.updatePostSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case getType(updatePost.updatePostFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(deletePost.deletePostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(deletePost.deletePostSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case getType(deletePost.deletePostFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
