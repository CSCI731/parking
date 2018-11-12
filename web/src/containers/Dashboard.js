import { connect } from 'react-redux';
import locationActions from "../redux/actions/locations";
import signActions from '../redux/actions/signs';
import DashboardView from '../views/Dashboard';


const mapStateToProps = state => {
  return {
    menuIsOpen: state.ui.menuIsOpen,
    boro: state.locations.boro,
    main: state.locations.main,
    from: state.locations.from,
    to: state.locations.to,
    currentPosition: state.locations.currentPosition,
    signs: state.signs.signs,
  };
};

const mapDispatchToProps = dispatch => ({
  locationsByLatLng: (lat, lng) => dispatch(locationActions.locationsByLatLng(lat, lng)),
  signsByStreet: (boro, mainSt, fromSt, toSt) => dispatch(signActions.signsByStreet(boro, mainSt, fromSt, toSt)),
  reverseGeocode: (lat, lng) => dispatch(locationActions.reverseGeocode(lat, lng)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
