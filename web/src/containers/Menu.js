/**
 * File: containers/Menu.js
 * Project: NYCParking
 * -----
 */


import { connect } from 'react-redux';
import uiActions from '../redux/actions/ui';
import locationActions from '../redux/actions/locations';
import signActions from '../redux/actions/signs';
import Menu from '../components/Menu';


const mapStateToProps = state => {
  return {
    menuIsOpen: state.ui.menuIsOpen,
    boro: state.locations.boro,
    main: state.locations.main,
    from: state.locations.from,
    to: state.locations.to,
  };
};

const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch(uiActions.closeMenu()),
  openMenu: () => dispatch(uiActions.openMenu()),
  getFromStreets: (boro, main_st) => dispatch(locationActions.getFromStreets(boro, main_st)),
  getToStreets: (boro, main_st, from_st) => dispatch(locationActions.getToStreets(boro, main_st, from_st)),
  signsByStreet:(boro, main_st, from_st, to_st) =>dispatch(signActions.signsByStreet(boro, main_st, from_st, to_st)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);