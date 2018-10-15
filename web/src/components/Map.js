/* global google:false */

import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import uiActions from '../redux/actions/ui';
import locationActions from '../redux/actions/locations';
import PropTypes from 'prop-types';
import { geolocated, geoPropTypes } from 'react-geolocated';
import withStyles from '@material-ui/core/styles/withStyles';
import Loading from '../views/Loading';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const styles = {
  search: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    height: '32px',
    marginTop: '27px',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipses',
  }
};

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  openSidebar: () => dispatch(uiActions.openSidebar()),
  closeSidebar: () => dispatch(uiActions.closeSidebar()),
  locationsByLatLng: (lat, lng) => dispatch(locationActions.locationsByLatLng(lat, lng)),
});


const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bounds: null,
      center: props.center,
      marker: props.marker,
    };
  }


  toggleInfoWindow = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  handleMapBoundsChanged = () => {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter(),
    })
  };

  handlePlacesChanged = () => {
    const { openSidebar, locationsByLatLng } = this.props;
    const { marker } = this.state;
    const places = this.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();
    console.log('place changed');
    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });


    const markers = places.map(place => ({
      position: place.geometry.location
    }));

    const nextMarker = get(markers, '0.position', marker);

    locationsByLatLng(nextMarker.lat(), nextMarker.lng());
    this.setState({
      center: nextMarker,
      marker: nextMarker,
    });
  };


  render() {
    const {
      isGeolocationAvailable,
      isGeolocationEnabled,
      coords,
      classes,
    } = this.props;
    const { center, bounds, marker } = this.state;

    const { isOpen } = this.state;
    if (!isGeolocationAvailable) {
      return <div>Your browser does not support GeoLocation</div>;
    }

    if (!isGeolocationEnabled) {
      return <div>GeoLocation is not enabled</div>;
    }

    if (!coords) {
      return <Loading />;
    }

    let defaultCenter;

    if (center) {
      defaultCenter = center;
    } else {
      defaultCenter = { lat: coords.latitude, lng: coords.longitude };
    }

    let defaultMarker;
    if (marker) {
      defaultMarker = marker;
    } else {
      defaultMarker = { lat: coords.latitude, lng: coords.longitude };
    }

    return (
      <GoogleMap
        ref={(c) => {
          this.map = c;
        }}
        defaultZoom={16}
        center={defaultCenter}
        defaultOptions={{
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
        onBoundsChanged={this.handleMapBoundsChanged}
      >
        <SearchBox
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.handlePlacesChanged}
          ref={(c) => {
            this.searchBox = c;
          }}
        >
          <input
            type="text"
            className={classes.search}
            placeholder="Enter a location"
          />
        </SearchBox>
        <Marker
          position={defaultMarker}
          onClick={this.toggleInfoWindow}
        >
          {isOpen &&
          <InfoWindow onCloseClick={this.toggleInfoWindow}>
            <div>You are here</div>
          </InfoWindow>
          }
        </Marker>
      </GoogleMap>
    )
  }
}


Map.defaultProps = {
  center: null,
  marker: null,
};

Map.propTypes = {
  ui: PropTypes.shape({showSideBar: PropTypes.bool.isRequired}).isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  locationsByLatLng: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  marker: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

Map.propTypes = { ...Map.propTypes, ...geoPropTypes };

const connectedMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(withScriptjs(withGoogleMap(withStyles(styles)(connectedMap))));

