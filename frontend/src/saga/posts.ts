import { call, put, takeEvery } from 'redux-saga/effects';
import { postsRequest, postsRequestSuccess, postsRequestFailure, postDelete } from '../actions/posts';

const request = () => {
  return fetch('http://localhost:1337/posts')
    .then(resp => {
      const isSuccess = resp.ok;
      return isSuccess ? resp.json() : resp.text();
    });
};

function* fetchPosts() {
  try {
    const posts = yield call(request);
    yield put(postsRequestSuccess(posts));
  } catch (error) {
    yield put(postsRequestFailure(error));
  }
}

const deleteRequest = async (postId: string) => {
  const resp = await fetch(`http://localhost:1337/posts/${postId}`, { method: 'DELETE' });
  const isSuccess = resp.ok;
  if (isSuccess) {
    return await resp.json();
  } else {
    const errorMessage = await resp.text();
    throw new Error(errorMessage);
  }
};

function* deletePost(action: { type: 'POSTS_DELETE_REQUEST', postId: string }) {
  try {
    yield call(deleteRequest, action.postId);
    yield put(postDelete(action.postId));
  } catch (error) {
    console.error(error);
  }
}

function* saga() {
  yield takeEvery(postsRequest().type, fetchPosts);
  yield takeEvery('POSTS_DELETE_REQUEST', deletePost);
}

export default saga;
