import {combineReducers} from 'redux';
import meterUpdaters from './meterUpdater';
import homePage from './homePage';
import userPage from './userPage'

export default combineReducers({
  meterUpdaters,
  homePage,
  userPage
})
