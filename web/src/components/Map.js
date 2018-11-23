/**
 * File: Map.js
 * Project: NYCParking
 * -----
 */
/* global google:false */

import React from "react";
import { Input } from 'antd';
import PropTypes from 'prop-types';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps";

const Search = Input.Search;

class Map extends React.Component {
  state = {
    bounds: null,
    infoWindowOpen: false,
  };

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
      address,
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
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_RIGHT}
          onPlacesChanged={() => handlePlacesChanged(this.map, this.searchBox)}
          ref={(c) => {
            this.searchBox = c;
          }}
        >
          <Search
            enterButton
            autoFocus
            placeholder="Search"
            onSearch={value => console.log(value)}
            style={{
              width: '340px',
              marginTop: '27px',
              marginRight: '10px',
              padding: '0 12px',
            }}
          />
        </SearchBox>
        {marker &&
        <Marker
          position={marker}
          onClick={this.toggleInfoWindow}
        >
          {infoWindowOpen &&
          <InfoWindow onCloseClick={this.toggleInfoWindow}>
            <div><b>{address}</b></div>
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
  address: PropTypes.string.isRequired,
  handlePlacesChanged: PropTypes.func.isRequired,
};

const InjectedMap = withScriptjs(withGoogleMap(Map));

export default InjectedMap;


