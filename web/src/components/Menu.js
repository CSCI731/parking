/**
 * File: Menu.js
 * Project: NYCParking
 * -----
 */


import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainSt: null,
      fromSt: null,
      toSt: null,
    };
    this.handleMainStChange = this.handleMainStChange.bind(this);
    this.handleFromStChange = this.handleFromStChange.bind(this);
    this.handleToStChange = this.handleToStChange.bind(this);
  }

  handleClose = () => {
    const { closeMenu } = this.props;
    closeMenu();
  };

  handleMainStChange = function (event) {
    const { boro, getFromStreets } = this.props;
    this.setState({
      mainSt: event.target.value,
      fromSt: null,
      toSt: null,
    });
    getFromStreets(boro, event.target.value);
  };

  handleFromStChange = function (event) {
    const { boro, getToStreets } = this.props;
    const { mainSt } = this.state;
    this.setState({
      fromSt: event.target.value,
      toSt: null,
    });
    getToStreets(boro, mainSt, event.target.value);
  };

  handleToStChange = function (event) {
    const { boro, signsByStreet } = this.props;
    const { mainSt, fromSt } = this.state;
    this.setState({
      toSt: event.target.value,
    });

    signsByStreet(boro, mainSt, fromSt, event.target.value);
  };

  render() {
    const { classes, theme, menuIsOpen, main, from, to } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={menuIsOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleClose}>
            {theme.direction === 'ltr' ?
              <ChevronLeftIcon /> :
              <ChevronRightIcon />
            }
          </IconButton>
        </div>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="main_st">On Street</InputLabel>
          <Select
            value={this.state.mainSt}
            onChange={this.handleMainStChange}
            inputProps={{
              name: 'main_st',
              id: 'main_st',
            }}
          >
            {main.map(st => (
              <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="from_st">Cross Street 1</InputLabel>
          <Select
            value={this.state.fromSt}
            onChange={this.handleFromStChange}
            inputProps={{
              name: 'from_st',
              id: 'from_st',
            }}
          >
            {from.map(st => (
              <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="main_st">Cross Street 2</InputLabel>
          <Select
            value={this.state.toSt}
            onChange={this.handleToStChange}
            inputProps={{
              name: 'to_st',
              id: 'to_st',
            }}
          >
            {to.map(st => (
              <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Drawer>
    );
  }
}

Menu.defaultProps = {
  boro: String,
  main: [],
};

Menu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  menuIsOpen: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  boro: PropTypes.string,
  main: PropTypes.arrayOf(PropTypes.shape({})),
  from: PropTypes.arrayOf(PropTypes.shape({})),
  to: PropTypes.arrayOf(PropTypes.shape({})),
  getFromStreets: PropTypes.func.isRequired,
  getToStreets: PropTypes.func.isRequired,
  signsByStreet: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);