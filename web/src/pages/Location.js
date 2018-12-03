import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Row, Col, Button, message, Table } from 'antd';
import { borough, sideOfStreet } from '../lib/utils';
import signsQuery from '../gql/query/signs';
import DirectionContainer from '../containers/Direction';

const columns = [
  {
    title: 'Sequence',
    dataIndex: 'sequence',
  },
  {
    title: 'Distance',
    dataIndex: 'distance',
  },
  {
    title: 'Arrow Point',
    dataIndex: 'arrow_pt',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];

class Location extends React.Component {
  render() {
    const { data: { location } } = this.props;
    return (
      <div style={{ margin: "10px" }}>
        <div>
          <Link to="/admin"><Button icon="arrow-left" /></Link>
        </div>
        <h1>Location</h1>
        <Row gutter={32}>
          <Col span={12}>
            <DirectionContainer
              boro={location.boro}
              mainSt={location.main_st}
              fromSt={location.from_st}
              toSt={location.to_st}
            />
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}><b>Borough</b></Col>
              <Col span={16}>{borough(location.boro)}</Col>
            </Row>
            <Row>
              <Col span={8}>
                <b>Order No.</b>
              </Col>
              <Col>
                {location.order_no}
              </Col>
            </Row>
            <Row>
              <Col span={8}><b>On Street</b></Col>
              <Col span={12}>{location.main_st}</Col>
            </Row>
            <Row>
              <Col span={8}><b>Cross Street 1</b></Col>
              <Col span={12}>{location.from_st}</Col>
            </Row>
            <Row>
              <Col span={8}><b>Cross Street 2</b></Col>
              <Col span={12}>{location.to_st}</Col>
            </Row>
            <Row>
              <Col span={8}><b>Side of Street</b></Col>
              <Col span={12}>{sideOfStreet(location.sos)}</Col>
            </Row>
          </Col>
        </Row>
        <h1 style={{ marginTop: '10px' }}>Signs</h1>
        <Row>
          <Col>
            <Query query={signsQuery} variables={{ input: { boro: location.boro, order_no: location.order_no } }}>
              {({ loading, error, data }) => {
                if (error) {
                  message.error(error.message);
                }

                return (
                  <Table
                    columns={columns}
                    dataSource={(data && data.signs) || []}
                    loading={loading}
                    rowKey={record => record._id}
                  />
                )
              }}
            </Query>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Location;