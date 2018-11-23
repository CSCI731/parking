/**
 * File: SideBar.js
 * Project: NYCParking
 * -----
 */


import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Select, Form } from "antd";
import CrossStreet1 from '../containers/CrossStreet1';
import CrossStreet2 from '../containers/CrossStreet2';

const { Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SideBar extends React.Component {
  state = {
    onStreet: null,
    crossStreet1: undefined,
    crossStreet2: undefined,
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };

  handleOnStreetChange = (value) => {
    this.setState({
      onStreet: value,
      crossStreet1: undefined,
      crossStreet2: undefined,
    });
  };

  handleCrossStreet1Change = (value) => {
    this.setState({
      crossStreet1: value,
      crossStreet2: undefined,
    });
  };

  handleCrossStreet2Change = (value) => {
    this.setState({
      crossStreet2: value,
    });
  };


  render() {
    const { loading, locationsByLatLng, error } = this.props;
    const { collapsed, onStreet, crossStreet1, crossStreet2 } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        collapsedWidth={0}
        breakpoint="lg"
        width={240}
      >
        <div className="logo" />

        <Form layout="vertical">
          <FormItem
            label={<span style={{ color: '#fff' }}>On Street</span>}
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            <Select
              showSearch
              allowClear
              defaultActiveFirstOption
              placeholder={loading ? 'Loading...' : 'Search'}
              onChange={this.handleOnStreetChange}
              disabled={error}
            >
              {locationsByLatLng && locationsByLatLng.streetNames.map(streetName => (
                <Option key={streetName} value={streetName}>{streetName}</Option>
              ))}
            </Select>
          </FormItem>
          <CrossStreet1
            boro={locationsByLatLng && locationsByLatLng.boro}
            onStreet={onStreet}
            crossStreet1={crossStreet1}
            onChange={this.handleCrossStreet1Change}
          />
          <CrossStreet2
            boro={locationsByLatLng && locationsByLatLng.boro}
            onStreet={onStreet}
            crossStreet1={crossStreet1}
            crossStreet2={crossStreet2}
            onChange={this.handleCrossStreet2Change}
          />
        </Form>
      </Sider>
    );
  }
}

SideBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  locationsByLatLng: PropTypes.shape({
    boro: PropTypes.string.isRequired,
    streetNames: PropTypes.arrayOf(PropTypes.string)
  })
};

export default SideBar;

