import React from 'react';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { Form, message, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class CrossStreet1 extends React.Component {

  render() {
    const { crossStreet1, onChange, data: { loading, error, locations} } = this.props;
    if (error) {
      const msg = (error.graphQLErrors.length > 0 && error.graphQLErrors.map(({ message }) => (
        message
      ))) || [error.message];
      message.error(msg.join('<br/>'));
    }


    return (
      <FormItem
        label={<span style={{ color: '#fff' }}>Cross Street 1</span>}
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <Select
          showSearch
          allowClear
          value={crossStreet1}
          defaultActiveFirstOption
          placeholder={loading ? 'Loading...' : 'Search'}
          onChange={onChange}
        >
          {locations && uniq(map(locations.locations, 'from_st')).map(location => (
            <Option key={location} value={location}>{location}</Option>
          ))}
        </Select>
      </FormItem>
    );
  }
}

CrossStreet1.propTypes = {
  onStreet: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  crossStreet1: PropTypes.string,
};

export default CrossStreet1;


