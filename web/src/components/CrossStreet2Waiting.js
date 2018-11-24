import React from 'react';
import { Form, Select, Button, Col, Row, Icon, } from 'antd';

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
        <Row>
          <Col span={20}>
            <Select
              showSearch
              allowClear
              defaultActiveFirstOption
              disabled
            >
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="button" disabled ><Icon type="arrow-right" /></Button>
          </Col>
        </Row>
      </FormItem>
    );
  }
}


export default CrossStreet2Waiting;