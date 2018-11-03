import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { loadState, saveState } from './localStorage';

const composeEnhancers = composeWithDevTools({});

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
