import { ActionTypes } from '../actions/auth';
import { Reducer } from 'redux';

export class State {
  readonly token: string | null = null;
  readonly inProgress: boolean = false;
  readonly error: Error | null = null;
}

export const reducer: Reducer<State, ActionTypes> = (
  state = { ...new State() },
  action: ActionTypes
) => {
  if (action.type === 'auth/set-token') {
    return { ...state, token: action.payload };
  }

  if (action.type === 'auth/set-in-progress') {
    return { ...state, inProgress: action.payload };
  }

  if (action.type === 'auth/set-error') {
    return { ...state, error: action.payload };
  }

  return state;
};
