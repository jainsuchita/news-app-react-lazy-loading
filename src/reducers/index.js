// reducers produce the state of your application.

import { combineReducers } from 'redux';

import articleReducer from './articleReducer';
import remoteReducer from './remoteReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  remoteArticles: remoteReducer
});

export default rootReducer;
