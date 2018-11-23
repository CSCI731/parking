
import gql from 'graphql-tag';

export default gql`
    query LocationsByLatLng ($lat: Float!, $lng: Float!) {
        locationsByLatLng(lat:$lat, lng:$lng) {
            boro
            streetNames
        }
    }
`;