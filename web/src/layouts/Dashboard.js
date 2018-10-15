import { connect } from 'react-redux';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import DashboardContainer from '../containers/Dashboard';

const mapStateToProps = state => ({
  ui: state.ui,
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});


const Dashboard = (props) => {
  const { ui, classes } = props;
  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <DashboardContainer />
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
)(withStyles(styles, { withTheme: true })(Dashboard));


