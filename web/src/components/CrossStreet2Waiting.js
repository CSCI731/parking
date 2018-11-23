import React from 'react';
import { Form, Select } from 'antd';

const FormItem = Form.Item;

class CrossStreet2Waiting extends React.Component {
  render() {
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
          defaultActiveFirstOption
          disabled
        >
        </Select>
      </FormItem>
    );
  }
}


export default CrossStreet2Waiting;