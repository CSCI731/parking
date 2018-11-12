import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MenuContainer from '../containers/Menu';
import DashboardContainer from '../containers/Dashboard';

const styles = () => ({
  root: {
    display: 'flex',
  },
});


const Dashboard = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuContainer />
      <DashboardContainer />
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Dashboard);



