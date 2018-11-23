/**
 * File: GeoMap.js
 * Project: NYCParking
 * -----
 */
/* global google:false */

import React from 'react';
import ParkingMap from '../containers/ParkingMap';
import { geolocated, geoPropTypes } from 'react-geolocated';
import get from "lodash/get";

const QueensCollege = { lat: 40.7353648, lng: -73.8152625 };

class GeoMap extends React.Component {
  state = {
    center: null,
    address: 'You are here',
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

    const nextCenter = get(places, '0.geometry.location');
    const address = get(places, '0.formatted_address', 'You are here');
    this.setState({
      address,
      center: { lat: nextCenter.lat(), lng: nextCenter.lng() },
    });
  };

  render() {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const { address, center } = this.state;

    if (!isGeolocationAvailable) {
      return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
      return <div>Geolocation is not enabled</div>;
    }

    const defaultCenter = coords ? { lat: coords.latitude, lng: coords.longitude } : QueensCollege;

    return (
      <ParkingMap
        center={center || defaultCenter}
        address={address}
        handlePlacesChanged={this.handlePlacesChanged}
      />
    )
  }
}

GeoMap.propTypes = { ...GeoMap.propTypes, ...geoPropTypes };

const InjectedGeoMap = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(GeoMap);

export default InjectedGeoMap;


