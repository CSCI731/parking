/**
 * File: ui.js
 * Project: NYCParking
 * File Created: 15 October 2018 2:07 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */
import types from '../types';

const initState = {
  menuIsOpen: true,
};

const ui = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case types.OPEN_MENU:
      return {
        menuIsOpen: true,
      };
    case types.CLOSE_MENU:
      return {
        menuIsOpen: false,
      };
    default:
      return state;
  }
};

export default ui;
