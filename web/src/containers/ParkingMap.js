/**
 * File: ParkingMap.js
 * Project: NYCParking
 * File Created: 22 November 2018 12:39 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import locationByLatLng from '../gql/query/locationByLatLng';
import ParkingMap from '../components/ParkingMap';

export default compose(
  graphql(locationByLatLng, {
    options: props => ({
      variables: {
        lat: props.center.lat,
        lng: props.center.lng,
      }
    })
  }),
)(ParkingMap);