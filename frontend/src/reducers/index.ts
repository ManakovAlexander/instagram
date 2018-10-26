import { combineReducers } from 'redux';

import { reducer as editPost, State as EditPosts } from './edit-post';
import { reducer as posts, State as Posts } from './posts';
import { reducer as register, State as Register } from './register';

export interface IStore {
  editPost: EditPosts;
  posts: Posts;
  register: Register;
}

const reducer = combineReducers<IStore>({
  editPost,
  posts,
  register,
});

export default reducer;
