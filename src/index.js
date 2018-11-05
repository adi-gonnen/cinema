import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// import rootReducer from './reducers'

// ReactDOM.render(
    // {/* <Router basename={process.env.PUBLIC_URL}>
    //     <App />
    // </Router>, document.getElementById('root')); 
  // }

const movieReduser = (state = [], action) => {
  switch (action.type) {
      case 'SAVE_MOVIE':
          return [
          ...state,
          {
              id: action.id,
              movie: action.movie,
          }
          ]
      default: return state
  }
}
const reducers = combineReducers({
  movieState: movieReduser,
});

const store = createStore(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
   

serviceWorker.unregister();


