import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/store';

const store = configureStore();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
      <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
