/**
 * File: ParkingMap.js
 * Project: NYCParking
 * File Created: 22 November 2018 12:36 AM
 * Author: Justin Li (jli@arising.net)
 * -----
 */


import React from 'react';
import { Layout, message } from 'antd';
import SideBar from './SideBar';
import Map from './Map';
import PropTypes from 'prop-types';

const Content = Layout.Content;


class ParkingMap extends React.Component {
  render() {
    const {
      bounds, center, address, handlePlacesChanged, data: { error, loading, locationsByLatLng }
    } = this.props;
    if (error) {
      const msg = (error.graphQLErrors.length > 0 && error.graphQLErrors.map(({ message }) => (
        message
      ))) || [error.message];
      message.error(msg.join('<br/>'));
    }

    return (
      <Layout>
        <SideBar loading={loading} locationsByLatLng={locationsByLatLng} error={!!error} />
        <Content>
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,geometry`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} id="map-container" />}
            mapElement={<div style={{ height: `100%` }} />}
            handlePlacesChanged={handlePlacesChanged}
            defaultCenter={center}
            center={center}
            marker={center}
            address={address}
            bounds={bounds}
          />
        </Content>
      </Layout>
    );
  }
}

ParkingMap.propTypes = {
  center: PropTypes.shape({ lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired, }),
  address: PropTypes.string.isRequired,
  handlePlacesChanged: PropTypes.func.isRequired,
};

export default ParkingMap;