/**
 * File: GeoMap.js
 * Project: NYCParking
 * -----
 */

/* global google:false */

import get from 'lodash/get';
import React from 'react';
import Map from '../containers/Map';
import { geolocated, geoPropTypes } from 'react-geolocated';

const QueensCollege = { lat: 40.7353648, lng: -73.8152625 };

class GeoMap extends React.Component {
  state = {
    bounds: null,
    center: null,
  };

  handlePlacesChanged = (map, searchBox) => {
    const places = searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });

    const nextCenter = get(places, '0.geometry.location', this.state.center);

    this.setState({
      center: nextCenter,
    });
  };



  render() {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const { bounds, center } = this.state;

    if (!isGeolocationAvailable) {
      return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
      return <div>Geolocation is not enabled</div>;
    }

    const defaultCenter = coords ? { lat: coords.latitude, lng: coords.longitude } : QueensCollege;

    return (
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,geometry`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        handlePlacesChanged={this.handlePlacesChanged}
        handleMapBoundsChanged={this.handleMapBoundsChanged}
        defaultCenter={defaultCenter}
        center={center || defaultCenter}
        marker={center || defaultCenter}
        bounds={bounds}
      />
    )
  }
}

GeoMap.propTypes = { ...GeoMap.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(GeoMap);
