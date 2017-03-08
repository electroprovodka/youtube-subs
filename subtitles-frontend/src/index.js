import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import createStore from './store';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// Supply initialState if needed
const initialState = { user: {isAuthenticated: false}, data: {
	query: '',
	loading: false,
	videos: [],
	totalLength: 0,
	page: 1,
	totalPages: 0
}};
const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
