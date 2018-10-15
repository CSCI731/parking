/**
 * File: index.js
 * Project: NYCParking
 * File Created: 15 October 2018 2:00 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import { combineReducers } from 'redux';
import ui from './ui';
import locations from './locations';
import signs from './signs';

export default combineReducers({
  ui,
  locations,
  signs,
});
