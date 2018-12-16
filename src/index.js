import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers/index'
import App from './components/App'
import './index.css';
import './UserPage.css';
import './home.css';
import { CookiesProvider } from 'react-cookie';


let store = createStore(reducers);
ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>, document.getElementById('root')
)
