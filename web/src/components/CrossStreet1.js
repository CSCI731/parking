import React from 'react';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { Form, message, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class CrossStreet1 extends React.Component {
  state = {
    crossStreet1: undefined,
  };

  componentDidUpdate(preProps) {
    if (this.props.onStreet !== preProps.onStreet) {
      this.setState({
        crossStreet1: undefined,
      })
    }
  }

  handleCrossStreet1Change = (value) => {
    this.setState({
      crossStreet1: value,
    });
  };


  render() {
    const { data: { loading, error, locations } } = this.props;
    const { crossStreet1 } = this.state;
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
          onChange={this.handleCrossStreet1Change}
        >
          {locations && uniq(map(locations, 'from_st')).map(location => (
            <Option key={location} value={location}>{location}</Option>
          ))}
        </Select>
      </FormItem>
    );
  }
}

CrossStreet1.propTypes = {
  onStreet: PropTypes.string,
};

export default CrossStreet1;


