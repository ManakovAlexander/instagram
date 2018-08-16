import { call, put, takeEvery } from 'redux-saga/effects';
import { postsRequest, postsRequestSuccess, postsRequestFailure } from '../actions/posts';

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

function* saga() {
  yield takeEvery(postsRequest().type, fetchPosts);
}

export default saga;
