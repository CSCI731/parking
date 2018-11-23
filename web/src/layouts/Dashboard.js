import React from 'react';
import GeoMap from '../components/GeoMap';


class Dashboard extends React.Component {

  render() {
    return (
      <div style={{ minHeight: 360 }}>
        <GeoMap />
      </div>
    );
  }
}


Dashboard.propTypes = {};

export default Dashboard;



