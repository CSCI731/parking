import React from 'react';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { Form, message, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class CrossStreet2 extends React.Component {
  render() {
    const { crossStreet2, onChange, data: { loading, error, locations } } = this.props;
    if (error) {
      const msg = (error.graphQLErrors.length > 0 && error.graphQLErrors.map(({ message }) => (
        message
      ))) || [error.message];
      message.error(msg.join('<br/>'));
    }

    return (
      <FormItem
        label={<span style={{ color: '#fff' }}>Cross Street 2</span>}
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <Select
          showSearch
          allowClear
          value={crossStreet2}
          defaultActiveFirstOption
          placeholder={loading ? 'Loading...' : 'Search'}
          onChange={onChange}
        >
          {locations && uniq(map(locations, 'to_st')).map(location => (
            <Option key={location} value={location}>{location}</Option>
          ))}
        </Select>
      </FormItem>
    );
  }
}

CrossStreet2.propTypes = {
  onStreet: PropTypes.string,
  crossStreet2: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CrossStreet2;


