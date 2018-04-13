import React from 'react';
import PropTypes from 'prop-types';

const LoadingIndicator = (props) => (
  <img style={props.style} src={`/assets/img/sc-spinner${props.size}.gif`} alt="Loading" />
);

LoadingIndicator.propTypes = {
  size: PropTypes.oneOf([16, 32]),
  style: PropTypes.object,
};

LoadingIndicator.defaultProps = {
  style: {},
  size: 16,
};

export default LoadingIndicator;
