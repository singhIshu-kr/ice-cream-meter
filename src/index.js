import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducers from './reducers/index'
import App from './components/App'
import './index.css';
import './UserPage.css';
import './home.css';
import { CookiesProvider } from 'react-cookie';


let store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>, document.getElementById('root')
)
