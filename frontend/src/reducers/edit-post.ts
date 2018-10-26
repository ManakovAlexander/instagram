import { IPost } from '../models/post';
import { ActionTypes } from '../actions/posts';
import { Reducer } from 'redux';

export class State {
  post: IPost | null = null;
  fetchInProgress = false;
  fetchError: Error | null = null;
  saveInProgress = false;
  saveError: Error | null = null;
}

export const reducer: Reducer<State, ActionTypes> = (state = { ...new State() }, action: ActionTypes) => {
  return state;
};
