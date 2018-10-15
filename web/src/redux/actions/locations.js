import types from '../types';
import { createApolloFetch } from 'apollo-fetch';

const uri = process.env.REACT_APP_GRAPHQL_SERVER_URI;
const apolloFetch = createApolloFetch({ uri });

export const locationsByLatLng = (lat, lng) => {
  return function (dispatch) {

    const query = `
      query LocationsByLatLng ($lat: Float!, $lng: Float!) {
        locationsByLatLng(lat:$lat, lng:$lng) {
          _id,
          boro,
          main_st,
          from_st,
          to_st
        }
      }
    `;

    console.log(lat, lng);

    const variables = {
      lat,
      lng,
    };

    apolloFetch({ query, variables})
      .then((res) => {
        console.log(res);
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

export default {
  locationsByLatLng,
}