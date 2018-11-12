/**
 * File: Map.js
 * Project: NYCParking
 * File Created: 08 November 2018 11:54 PM
 * Author: Justin Li (jli@arising.net)
 * -----
 */

import { connect } from 'react-redux';
import uiActions from '../redux/actions/ui';
import locationActions from '../redux/actions/locations';
import Map from '../components/Map';

const mapStateToProps = (state) => ({
  menuIsOpen: state.ui.menuIsOpen,
});

const mapDispatchToProps = dispatch => ({
  openMenu: () => dispatch(uiActions.openMenu()),
  closeMenu: () => dispatch(uiActions.closeMenu()),
  locationsByLatLng: (lat, lng) => dispatch(locationActions.locationsByLatLng(lat, lng)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Map);
