import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducer';

let storeInstance = null;

export const init = (initialState = {}, history = null) => {
  const debug = process.env.NODE_ENV !== 'production';
  const middlewares = [thunk];

  if (history) {
    middlewares.push(routerMiddleware(history));
  }

  if (debug) {
    const logger = createLogger({ duration: true });
    middlewares.push(logger);
  }

  const enhancer = applyMiddleware(...middlewares);

  const store = createStore(makeRootReducer(), initialState, enhancer);
  store.asyncReducers = {};

  storeInstance = store;
  return storeInstance;
};

export const instance = () => storeInstance;

export default { init, instance };
