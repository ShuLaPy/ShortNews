import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
  authReducer,
  setCardReducer,
  setCategoryReducer,
  ShortsReducer,
} from './reducers';

const reducer = combineReducers({
  shorts: ShortsReducer,
  card: setCardReducer,
  category: setCategoryReducer,
  auth: authReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
