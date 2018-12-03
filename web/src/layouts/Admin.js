import React from 'react';
import store from 'store';
import {
  Layout, Avatar, Menu, Dropdown, Icon, Row, Col,
} from 'antd';
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LocationContainer from '../containers/Locations';

const { Header, Content, Footer } = Layout;

class LoginLayout extends React.Component {
  handleLogout = (e) => {
    e.preventDefault();
    const { history } = this.props;
    store.remove('token');
    history.push('/login');
  };

  render() {
    const { match } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="/" onClick={this.handleLogout}>Logout</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={2} offset={22}>
              <Dropdown overlay={menu}>
                <Avatar size="large">
                  <Icon type="user" style={{ fontSize: 24 }} />
                </Avatar>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content>
          <Switch>
            <PrivateRoute exact path={`${match.path}`} component={LocationContainer} />
          </Switch>
        </Content>
        <Footer>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block' }}>Copyright &copy; 2018 NYCParking</div>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default LoginLayout;