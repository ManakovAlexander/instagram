import { combineReducers } from 'redux';

import { reducer as auth, State as Auth } from './auth';
import { reducer as editPost, State as EditPosts } from './edit-post';
import { reducer as posts, State as Posts } from './posts';
import { reducer as register, State as Register } from './register';

export interface IStore {
  readonly auth: Auth;
  readonly editPost: EditPosts;
  readonly posts: Posts;
  readonly register: Register;
}

const reducer = combineReducers<IStore>({
  auth,
  editPost,
  posts,
  register,
});

export default reducer;
