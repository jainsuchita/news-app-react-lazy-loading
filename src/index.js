import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map.jsx';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Map />,
  document.getElementById('root')
);

module.hot.accept();
registerServiceWorker();
