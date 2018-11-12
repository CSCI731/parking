import types from '../types';
import { createApolloFetch } from 'apollo-fetch';

const uri = process.env.REACT_APP_GRAPHQL_SERVER_URI;
const apolloFetch = createApolloFetch({ uri });

export const locationsByLatLng = (lat, lng) => {
  return function (dispatch) {

    const query = `
      query LocationsByLatLng ($lat: Float!, $lng: Float!) {
        locationsByLatLng(lat:$lat, lng:$lng) {
          boro
          streetNames
        }
      }
    `;

    const variables = {
      lat,
      lng,
    };

    apolloFetch({ query, variables })
      .then((res) => {
        dispatch({
          type: types.LOCATIONS_BY_LATLNG,
          payload: res.data.locationsByLatLng,
        })
      })
      .catch((err) => {
        throw err;
      });
  }
};

export const getFromStreets = (boro, main_st) => {
  return function (dispatch) {
    const query = `
      query locations($boro: Borough!, $main_st: String!) {
        locations(boro:$boro, main_st:$main_st) {
          from_st
        }
      }
    `;
    const variables = {
      boro,
      main_st,
    };

    apolloFetch({ query, variables })
      .then((res) => {
        dispatch({
          type: types.GET_FROM_STREETS,
          payload: res.data.locations,
        })
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const getToStreets = (boro, main_st, from_st) => {
  return function (dispatch) {
    const query = `
      query locations($boro: Borough!, $main_st: String!, $from_st: String!) {
        locations(boro:$boro, main_st:$main_st, from_st: $from_st) {
          to_st
        }
      }
    `;
    const variables = {
      boro,
      main_st,
      from_st,
    };

    apolloFetch({ query, variables })
      .then((res) => {
        dispatch({
          type: types.GET_TO_STREETS,
          payload: res.data.locations,
        })
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const reverseGeocode = (lat, lng) => {
  return function (dispatch) {

    const query = `
      query reverseGeocode($lat: Float!, $lng: Float!) {
        reverseGeocode(lat:$lat, lng:$lng) 
      }
    `;

    const variables = {
      lat,
      lng,
    };

    apolloFetch({ query, variables })
      .then((res) => {
        dispatch({
          type: types.REVERSE_GEOCODE,
          payload: res.data.reverseGeocode,
        })
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default {
  locationsByLatLng,
  getFromStreets,
  getToStreets,
  reverseGeocode,
}