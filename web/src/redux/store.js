/**
 * File: store.js
 * Project: NYCParking
 * File Created: 15 October 2018 2:02 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const middleWares = [thunk];

if (process.env.REACT_APP_NODE_ENV === 'dev') {
  middleWares.push(logger);
}

const store = createStore(rootReducer, compose(applyMiddleware(...middleWares)));

export default store;