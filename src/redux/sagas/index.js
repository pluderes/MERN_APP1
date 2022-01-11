import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as APIs from "../../APIs";

function* fetchPostSaga(action) {
  try {
    const posts = yield call(APIs.fecthPosts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPosts.getPostsFailure(error));
  }
}

function* createPostSaga(action) {
  try {
    const post = yield call(APIs.createPost, action.payload);
    yield put(actions.createPost.createPostSuccess(post.data));
    // alert("Create post successfully!");
  } catch (error) {
    console.log(error);
    alert("Create post failed!");
    yield put(actions.createPost.createPostFailure(error));
  }
}

function* updatePostSaga(action) {
  try {
    const updatePost = yield call(APIs.updatePost, action.payload);
    yield put(actions.updatePost.updatePostSuccess(updatePost.data));
  } catch (error) {
    console.log(error);
    alert("Update failed!");
    yield put(actions.updatePost.updatePostFailure(error));
  }
}

function* deletePostSaga(action) {
  try {
    const deletePost = yield call(APIs.deletePost, action.payload);
    // alert("Delete successfully!");
    yield put(actions.deletePost.deletePostSuccess(deletePost));
  } catch (error) {
    console.log("error: ", error);
    yield put(actions.deletePost.deletePostFailure(error));
  }
}

function* mySaga() {
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);
}

export default mySaga;
