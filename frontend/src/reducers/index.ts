import { combineReducers } from 'redux';
import { reducer as posts, IState as IStatePost } from './posts';

export interface IStore {
  posts: IStatePost;
}

const reducer = combineReducers<IStore>({
  posts
});

export default reducer;
