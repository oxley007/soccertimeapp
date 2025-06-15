//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
//import { composeWithDevTools } from '@redux-devtools/extension';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from '../Reducers';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage

}

const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
//persistor.purge()
