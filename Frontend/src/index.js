import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
//import store, { history } from './store';

//const store = createStore(rootReducer)
import RootReducer from "./reducers";
const store = createStore(RootReducer)
//render App component on the root element
ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
