/**
 * File: Dashboard.js
 * Project: NYCParking
 * -----
 */

import React from 'react';
import ParkingMap from '../components/ParkingMap';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';


const drawerWidth = 240;

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing * 2,
    right: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Dashboard extends React.Component {
  render() {
    const {
      classes,
      menuIsOpen,
    } = this.props;


    return (
      <main className={classNames(classes.content, {
        [classes.contentShift]: menuIsOpen
      })}>
        <ParkingMap />
      </main>
    );
  }
}


Dashboard.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
};


export default (withStyles(styles, { withTheme: true })(Dashboard));
