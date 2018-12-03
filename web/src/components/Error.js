import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
  const { message } = props;
  return (
    <div>{message}</div>
  );
};

Error.defaultProps = {
  message: 'Something went wrong, you can try to refresh the page.',
};

Error.propTypes = {
  message: PropTypes.string,
};


export default Error;

