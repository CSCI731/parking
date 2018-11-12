/**
 * File: locations.js
 * Project: NYCParking
 * File Created: 15 October 2018 11:33 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import types from '../types';


const initState = {
  main: [],
  from: [],
  to: [],
  boro: null,
  currentPosition: null,
};

const locations = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case types.LOCATIONS_BY_LATLNG: {
      const { payload } = action;
      const main = payload.streetNames.map(street => {
        return { value: street, label: street };
      });
      return {
        ...state,
        boro: payload.boro,
        main: main,
        from: [],
        to:[],
      };
    }
    case types.GET_FROM_STREETS: {
      const { payload } = action;
      const from = uniq(map(sortBy(payload, 'from_st'), 'from_st')).map(from_st => {
        return { value: from_st, label: from_st };
      });

      return {
        ...state,
        from,
        to: [],
      }
    }
    case types.GET_TO_STREETS: {
      const { payload } = action;
      const to = uniq(map(sortBy(payload, 'to_st'), 'to_st')).map(to_st => {
        return { value: to_st, label: to_st };
      });

      return {
        ...state,
        to,
      }
    }
    case types.REVERSE_GEOCODE:
      return {
        ...state,
        currentPosition: action.payload,
      };
    default:
      return state;
  }
};

export default locations;
