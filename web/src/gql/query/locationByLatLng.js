/**
 * File: locationByLatLng.js
 * Project: NYCParking
 * File Created: 20 November 2018 11:24 PM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import gql from 'graphql-tag';

export default gql`
    query LocationsByLatLng ($lat: Float!, $lng: Float!) {
        locationsByLatLng(lat:$lat, lng:$lng) {
            boro
            streetNames
        }
    }
`;