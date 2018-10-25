import { call, put, takeEvery } from 'redux-saga/effects';
import { postsRequestSuccess, postsRequestFailure, postDelete } from '../actions/posts';
import { getPosts, deleteRequest } from '../requests/posts';

function* fetchPosts() {
  try {
    const posts = yield call(getPosts);
    yield put(postsRequestSuccess(posts));
  } catch (error) {
    yield put(postsRequestFailure(error));
  }
}

function* deletePost(action: { type: 'POSTS_DELETE_REQUEST', postId: string }) {
  try {
    yield call(deleteRequest, action.postId);
    yield put(postDelete(action.postId));
  } catch (error) {
    console.error(error);
  }
}

function* saga() {
  yield takeEvery('POSTS_REQUEST', fetchPosts);
  yield takeEvery('POSTS_DELETE_REQUEST', deletePost);
}

export default saga;
