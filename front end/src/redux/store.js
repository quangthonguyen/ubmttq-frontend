import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './slice/combineReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [],
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./slice/combineReducer', () =>
      store.replaceReducer(rootReducer)
    );
  }
  sagaMiddleware.run(rootSaga);

  return store;
}
