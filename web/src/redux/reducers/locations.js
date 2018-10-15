/**
 * File: locations.js
 * Project: NYCParking
 * File Created: 15 October 2018 11:33 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import types from '../types';

const initState = {
  main: {},
  from: {},
  to: {},
  boro: null,
};

const locations = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case types.LOCATIONS_BY_LATLNG:
      const { payload } = action;
      const main = {};
      const from = {};
      const to = {};
      const boro = payload[0].boro;
      payload.forEach(location => {
        if (!main[location.main_st]) {
          main[location.main_st] = { value: location.main_st, label: location.main_st };
        }

        if (!from[location.main_st]) {
          from[location.main_st] = [{ value: location.from_st, label: location.from_st }];
        } else {
          from[location.main_st].push({ value: location.from_st, label: location.from_st });
        }

        // to[location.main_st] = { [location.from_st]: { value: location.to_st, label: location.to_st } };
        if (!to[location.main_st]) {
          to[location.main_st] = { [location.from_st]: { value: location.to_st, label: location.to_st } };
        } else {
          to[location.main_st][location.from_st] = { value: location.to_st, label: location.to_st };
        }
      });
      return {
        boro,
        main,
        from,
        to,
      };
    default:
      return state;
  }
};

export default locations;
