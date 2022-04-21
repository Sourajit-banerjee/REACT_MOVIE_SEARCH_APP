import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import movies from './reducers'


const store=createStore(movies);
console.log('store:',store)
console.log('before state:',store.getState()) //todo:this prints an empty array-got from the reducdeer
//*since we pass the movies to createStore() it internally calls the reducer to get the initial state and over there state is undefined

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:' Superman '}]
// });

// console.log('after state:',store.getState())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />) //passing the store to app.js

