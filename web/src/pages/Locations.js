import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Popconfirm, Icon, message } from 'antd';
import { borough, sideOfStreet } from "../lib/utils";


const pageSize = 10;

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      refetching: false,
    }
  }

  onChange = (pagination, filters) => {
    const { data: { fetchMore } } = this.props;
    const input = {};


    if (filters) {
      if (filters.boro && filters.boro.length) {
        input.boro = filters.boro;
      }
    }

    this.setState({
      current: pagination.current,
      refetching: true,
    });

    fetchMore({
      variables: {
        input,
        offset: (pagination.current - 1) * pagination.pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      }
    }).then(() => {
      this.setState({
        refetching: false,
      });
    });
  };

  handleRemove = (location) => {
    const { mutate, data: { refetch } } = this.props;
    this.setState({
      refetching: true,
    });
    mutate({
      variables: {
        input: { _id: location._id },
      }
    }).then(() => {

      refetch().then(() => {
        this.setState({
          refetching: false,
        })
      });
    }).catch(err => {
      message.error(err.message);
    });
  };

  render() {
    const { data: { loading, locations } } = this.props;
    const { current, refetching } = this.state;

    const columns = [
      {
        title: 'No.',
        dataIndex: '_id',
        render: (text, location, index) => {
          return (current - 1) * pageSize + index + 1;
        },
      },
      {
        title: 'Borough',
        dataIndex: 'boro',
        filters: [{
          text: 'Queens',
          value: 'Q',
        }, {
          text: 'Brooklyn',
          value: 'K',
        }, {
          text: 'Manhattan',
          value: 'M',
        }, {
          text: 'Bronx',
          value: 'B',
        }, {
          text: 'Staten Island',
          value: 'S',
        }],
        onFilter: (value, location) => {
          return location.boro === value;
        },
        render: (text) => {
          return borough(text);
        },
        sorter: (a, b) => {
          if (a.boro < b.boro) {
            return -1;
          }
          if (a.boro > b.boro) {
            return 1;
          }

          return 0
        }
      },
      {
        title: 'On Street',
        dataIndex: 'main_st',
      },
      {
        title: 'Cross Street 1',
        dataIndex: 'from_st',
      },
      {
        title: 'Cross Street 2',
        dataIndex: 'to_st',
      },
      {
        title: 'Side of street',
        dataIndex: 'sos',
        render: (text) => {
          return sideOfStreet(text);
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/admin/locations/${record._id}`}><Button type="primary">View</Button></Link>
            <Divider type="vertical" />
            <a href="">Edit</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => this.handleRemove(record)}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
            <Button type="primary">Remove</Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    let totalCount;
    let dataSource;
    if (locations) {
      totalCount = locations.totalCount;
      dataSource = locations.locations;
    } else {
      totalCount = 0;
      dataSource = [];
    }
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={this.onChange}
          rowKey={location => location._id}
          loading={loading || refetching}
          pagination={{
            total: totalCount,
            size: 'small',
            current: current,
            pageSize,
          }}
        />
      </div>
    );
  }
}


export default Locations;