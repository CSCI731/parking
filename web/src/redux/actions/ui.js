/**
 * File: ui.js
 * Project: NYCParking
 * File Created: 15 October 2018 9:21 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import types from '../types';

export const openMenu = () => {
  return function (dispatch) {
    return dispatch({
      type: types.OPEN_MENU,
    });
  }
};

export const closeMenu = () => {
  return function (dispatch) {
    return dispatch({
      type: types.CLOSE_MENU,
    });
  }
};

export default {
  openMenu,
  closeMenu,
};


