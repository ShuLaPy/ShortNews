import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'shorts'],
};

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

const persistedReducer = persistReducer(persistConfig, reducer);

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);
