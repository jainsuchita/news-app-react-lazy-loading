import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/App.jsx';
import './styles/index.css';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();

// registerServiceWorker();
