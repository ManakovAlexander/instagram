import { combineReducers } from 'redux';

import { reducer as auth, State as Auth } from './auth';
import { reducer as editPost, State as EditPosts } from './edit-post';
import { reducer as posts, State as Posts } from './posts';
import { reducer as profile, State as Profile } from './profile';
import { reducer as register, State as Register } from './register';

export interface IStore {
  readonly auth: Auth;
  readonly editPost: EditPosts;
  readonly posts: Posts;
  readonly profile: Profile;
  readonly register: Register;
}

const reducer = combineReducers<IStore>({
  auth,
  editPost,
  posts,
  profile,
  register
});

export default reducer;
