import React from 'react';
import PropTypes from 'prop-types';
import { List, message, Drawer } from 'antd';
import map from 'lodash/map';
import filter from 'lodash/filter';

const blackList = ['Curb Line', 'Building Line', 'Property Line'];

class Regulations extends React.Component {
  render() {
    const {
      visible, onClose, data: { loading, error, signsByStreet },
    } = this.props;

    if (error) {
      const msg = (error.graphQLErrors.length > 0 && error.graphQLErrors.map(({ message }) => (
        message
      ))) || [error.message];
      message.error(msg.join('<br/>'));

      return null;
    }

    let dataSource = [];
    if (signsByStreet) {
      dataSource = filter(map(signsByStreet, 'description'), function (obj) {
        return !blackList.includes(obj);
      });
    }

    return (
      <Drawer
        title="Regulation Info"
        closable={true}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <List
          loading={loading}
          dataSource={dataSource}
          renderItem={item => (
            <List.Item>{item}</List.Item>
          )}
        />
      </Drawer>
    );
  }
}

Regulations.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Regulations;
