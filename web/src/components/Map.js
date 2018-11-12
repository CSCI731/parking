/**
 * File: Map.js
 * Project: NYCParking
 * -----
 */
/* global google:false */

import React from "react";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';

const styles = {
  searchBox: {
    left: `10px`,
  },
  searchInput: {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    marginTop: `27px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
  }
};

class Map extends React.Component {
  state = {
    bounds: null,
    infoWindowOpen: false,
  };

  componentDidMount() {
    const { locationsByLatLng, center } = this.props;
    locationsByLatLng(center.lat, center.lng);
  }

  handleMapBoundsChanged = () => {
    this.setState({
      bounds: this.map.getBounds(),
    });
  };

  toggleInfoWindow = () => {
    const { infoWindowOpen } = this.state;
    this.setState({
      infoWindowOpen: !infoWindowOpen,
    });
  };

  render() {
    const {
      center,
      marker,
      classes,
      menuIsOpen,
      openMenu,
      handlePlacesChanged,
    } = this.props;
    const { infoWindowOpen, bounds } = this.state;
    return (
      <GoogleMap
        ref={(c) => {
          this.map = c;
        }}
        defaultZoom={16}
        defaultCenter={center}
        center={center}
        defaultOptions={{
          zoomControl: false,
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
        onBoundsChanged={this.handleMapBoundsChanged}
      >
        <SearchBox
          className={classes.searchBox}
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={() => handlePlacesChanged(this.map, this.searchBox)}
          ref={(c) => {
            this.searchBox = c;
          }}
        >
          <div style={{ left: '20px' }}>
            <input
              type="text"
              className={classes.searchInput}
              placeholder="Search"
              ref={(c) => {
                this.searchInput = c;
              }}
            />
            {!menuIsOpen &&
            <IconButton onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            }
          </div>
        </SearchBox>
        {marker &&
        <Marker
          position={marker}
          onClick={this.toggleInfoWindow}
        >
          {infoWindowOpen &&
          <InfoWindow onCloseClick={this.toggleInfoWindow}>
            <div>You are here</div>
          </InfoWindow>
          }
        </Marker>
        }
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  marker: PropTypes.shape({}),
  center: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
  menuIsOpen: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  locationsByLatLng: PropTypes.func.isRequired,
  handlePlacesChanged: PropTypes.func.isRequired,
};

export default withScriptjs(withGoogleMap(withStyles(styles)(Map)));

