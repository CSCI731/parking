import types from '../types';
import { createApolloFetch } from 'apollo-fetch';

const uri = process.env.REACT_APP_GRAPHQL_SERVER_URI;
const apolloFetch = createApolloFetch({ uri });

export const signsByStreet = (boro, mainSt, fromSt, toSt) => {
  return function (dispatch) {

    const query = `
      query SignsByStreet ($boro: String!, $main_st: String!, $from_st: String!, $to_st: String!) {
        signsByStreet(boro:$boro, main_st:$main_st, from_st:$from_st, to_st:$to_st) {
          _id,
          boro,
          order_no,
          sequence,
          description,
        }
      }
    `;

    const variables = {
      boro,
      main_st: mainSt,
      from_st: fromSt,
      to_st: toSt,
    };

    apolloFetch({ query, variables })
      .then((res) => {
        dispatch({
          type: types.SIGNS_BY_STREET,
          payload: res.data.signsByStreet,
        })
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default {
  signsByStreet,
}
 