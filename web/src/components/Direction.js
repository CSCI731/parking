/* global google:false */

import React from 'react';
import { DirectionsRenderer, GoogleMap } from "react-google-maps";

class Direction extends React.Component {
  render() {
    const { directions } = this.props;
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={new google.maps.LatLng(40.7170619,-73.9649832)}
        defaultOptions={{
          zoomControl: false,
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    )
  }
}

export default Direction;