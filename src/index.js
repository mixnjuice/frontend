import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { LastLocationProvider } from 'react-router-last-location';

import './icons';
import './index.scss';
import App from './components/App/App';
import { getInitialState } from 'utils';

import rootSaga from './sagas';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();
const enhancers = composer(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, getInitialState(), enhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router>
    <LastLocationProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LastLocationProvider>
  </Router>,
  document.getElementById('root')
);

export default App;
