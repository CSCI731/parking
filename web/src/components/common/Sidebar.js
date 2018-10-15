import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from 'react-select';
import locationActions from '../../redux/actions/locations';
import Typegraphy from '@material-ui/core/Typography';

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  locationsByLatLng: (lat, lng) => dispatch(locationActions.locationsByLatLng(lat, lng)),
});


const drawerWidth = 240;

const styles = {
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
};

class Sidebar extends React.Component {
  state = {
    open: false,
    mainSt: null,
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };

  handleMainChange = (main) => {
    console.log(main);
  };


  render() {
    const { classes, locations } = this.props;
    const { open, mainSt } = this.state;
    const { main, from, to } = locations;

    return (
      <nav>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Typegraphy component="h2" variant="display1" gutterBottom>Search</Typegraphy>
          <Select options={Object.values(main)} onChange={this.handleMainChange} />
          {mainSt &&
          (
            <div>
              <Select options={from[mainSt.value]} />
              <Select options={to[mainSt.value]} />
            </div>
          )
          }
        </Drawer>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  locationsByLatLng: PropTypes.func.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
