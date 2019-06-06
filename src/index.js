import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, compose } from 'redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFire, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faFire, faUser);

import './index.scss';
import App from './components/App';

import rootSaga from './sagas';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();
const enhancers = composer(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, {}, enhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

export default App;
