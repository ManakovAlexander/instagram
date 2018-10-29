import { IPost } from '../models/post';
import { ActionTypes } from '../actions/edit-post';
import { Reducer } from 'redux';

export class State {
  readonly post: IPost | null = null;
  readonly fetchInProgress = false;
  readonly fetchError: Error | null = null;
  readonly saveInProgress = false;
  readonly saveError: Error | null = null;
}

export const reducer: Reducer<State, ActionTypes> = (state = { ...new State() }, action: ActionTypes) => {
  return state;
};
