import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import LoginForm from '../pages/Login';

const Sider = Layout.Sider;
const Content = Layout.Content;
const Footer = Layout.Footer;

class LoginLayout extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: '20px' }}>
        <Header />
        <LoginForm />
      </div>
    );
  }
}

export default LoginLayout;