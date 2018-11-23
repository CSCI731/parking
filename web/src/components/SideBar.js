/**
 * File: SideBar.js
 * Project: NYCParking
 * -----
 */


import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Select, Form } from "antd";
import CrossStreet1 from '../containers/CrossStreet1';

const { Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SideBar extends React.Component {
  state = {
    onStreet: null,
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
    });
  };

  render() {
    const { loading, locationsByLatLng, error } = this.props;
    const { collapsed, onStreet } = this.state;
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
            onStreet={onStreet} />
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

