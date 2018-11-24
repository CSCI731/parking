import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const Loading = ({ type, color, height, width }) => (
  <ReactLoading type={type} color={color} height={height} width={width} />
);

Loading.defaultProps = {
  type: 'spinningBubbles',
  color: '#000',
  height: '20%',
  width: '20%',
};

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Loading;