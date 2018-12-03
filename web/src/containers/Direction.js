/* global google:false */
import React from "react";
import { borough } from '../lib/utils';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { message } from 'antd';
import DirectionComp from '../components/Direction';

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const { boro, mainSt, fromSt, toSt } = this.props;
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: `${fromSt} & ${mainSt}, ${borough(boro)}, NY`,
        destination: `${toSt} & ${mainSt}, ${borough(boro)}, NY`,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          message.error(`error fetching directions ${result}`);
        }
      });
    }
  }),
)(DirectionComp);

