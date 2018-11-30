import React from 'react';
import header from '../img/header.png';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img src={header} alt="NYCParking"  />
      </div>
    );
  }
}

export default Header;