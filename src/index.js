import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import './index.css';
import App from './components/App.jsx';
// import store from './store';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

module.hot.accept();

// registerServiceWorker();
