import { connect } from 'react-redux';
import locationActions from "../redux/actions/locations";
import signActions from '../redux/actions/signs';
import DashboardView from '../views/Dashboard';

const mapStateToProps = state => ({
  boro: state.locations.boro,
  main: state.locations.main,
  from: state.locations.from,
  to: state.locations.to,
  signs: state.signs.signs,
});

const mapDispatchToProps = dispatch => ({
  locationsByLatLng: (lat, lng) => dispatch(locationActions.locationsByLatLng(lat, lng)),
  signsByStreet: (boro, mainSt, fromSt, toSt) => dispatch(signActions.signsByStreet(boro, mainSt, fromSt, toSt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
