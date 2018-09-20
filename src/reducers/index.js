import {combineReducers} from 'redux';
import meterUpdaters from './meterUpdater';
import homePage from './homePage';

export default combineReducers({
  meterUpdaters,
  homePage
})
