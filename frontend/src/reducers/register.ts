import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as registerActions from '../actions/register/sync';

type RegisterActions = ActionType<typeof registerActions>;

export class State {
  inProgress = false;
  error: Error | null = null;
}

export const reducer: Reducer<State, RegisterActions> = (state: State = new State(), action) => {
  if (action.type === 'register/setInProgress') {
    return {
      ...state,
      inProgress: action.payload,
    };
  }

  if (action.type === 'register/setError') {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};

