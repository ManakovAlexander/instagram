import { IPost } from '../models/post';
import { ActionTypes } from '../actions/posts';
import { Reducer } from 'redux';

export class State {
  readonly posts: ReadonlyArray<IPost> = [];
  readonly inProgress: boolean = false;
  readonly error: Error | null = null;
}

export const reducer: Reducer<State, ActionTypes> = (
  state = { ...new State() },
  action: ActionTypes
) => {
  if (action.type === 'posts/set') {
    return { ...state, posts: action.payload };
  }

  if (action.type === 'posts/setInProgress') {
    return { ...state, inProgress: action.payload };
  }

  if (action.type === 'posts/setError') {
    return { ...state, error: action.payload };
  }

  if (action.type === 'posts/delete') {
    return {
      ...state,
      posts: state.posts.filter(post => post._id !== action.payload)
    };
  }

  return state;
};
