import React from 'react';
import PropTypes from 'prop-types';
import GeoMap from './GeoMap';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  currentPosition: {
    zIndex: 1000,
  },
};


class ParkingMap extends React.Component {

  render() {
    return (
      <GeoMap />
    );
  }
}


ParkingMap.defaultProps = {
  center: null,
  marker: null,
};

ParkingMap.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};


export default withStyles(styles)(ParkingMap);

