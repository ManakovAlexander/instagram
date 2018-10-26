import { combineReducers } from 'redux';

import { reducer as posts, State as Posts } from './posts';
import { reducer as register, State as Register } from './register';

export interface IStore {
  posts: Posts;
  register: Register;
}

const reducer = combineReducers<IStore>({
  posts,
  register,
});

export default reducer;
