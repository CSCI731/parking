/**
 * File: Dashboard.js
 * Project: NYCParking
 * -----
 */

import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Map from '../components/Map';


class Dashboard extends React.Component {
  state = {
    mainSt: null,
    fromSt: null,
    toSt: null,
  };

  handleMainChange = (option) => {
    const { value } = option;
    this.setState({
      mainSt: value,
      fromSt: null,
      toSt: null,
    });
  };

  handleFromChange = (option) => {

    const { value } = option;
    this.setState({
      fromSt: value,
      toSt: null,
    });
  };

  handleToChange = (option) => {
    const { mainSt, fromSt } = this.state;
    const { boro, signsByStreet } = this.props;
    const { value } = option;
    this.setState({
      toSt: value,
    });
    signsByStreet(boro, mainSt, fromSt, value);
  };

  render() {
    const { main, from, to } = this.props;
    const { mainSt, fromSt } = this.state;
    return (
      <div className="dashboard">
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,geometry`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <div>
          <div>
            <label htmlFor="main_st">
              <Select id="main_st" options={Object.values(main)} onChange={this.handleMainChange} />
            </label>
          </div>
          <div>
            <label htmlFor="from_st">
              {mainSt ?
                <Select id="from_st" options={from[mainSt]} onChange={this.handleFromChange} /> :
                <Select id="from_st" options={[]} />
              }
            </label>
          </div>
          <div>
            <label htmlFor="to_st">
              {mainSt && fromSt ?
                <Select id="to_st" options={[to[mainSt][fromSt]]} onChange={this.handleToChange}></Select> :
                <Select id="to_st" options={[]}></Select>
              }
            </label>
          </div>
        </div>
        <div>

        </div>
      </div>
    );
  };
}

Dashboard.defaultProps = {
  boro: null,
};

Dashboard.propTypes = {
  main: PropTypes.shape({}).isRequired,
  from: PropTypes.shape({}).isRequired,
  to: PropTypes.shape({}).isRequired,
  boro: PropTypes.string,
  signsByStreet: PropTypes.func.isRequired,
};

export default Dashboard;