import React from 'react';
import Header from '../components/Header';
import LoginForm from '../pages/Login';

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