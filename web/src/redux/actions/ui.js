/**
 * File: ui.js
 * Project: NYCParking
 * File Created: 15 October 2018 9:21 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import types from '../types';

export const openSidebar = () => {
  return function (dispatch) {
    return dispatch({
      type: types.OPEN_SIDEBAR,
    });
  }
};

export const closeSidebar = () => {
  return function (dispatch) {
    return dispatch({
      type: types.CLOSE_SIDEBAR,
    });
  }
};

export default {
  openSidebar,
  closeSidebar,
}

