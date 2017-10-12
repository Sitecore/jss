import React from 'react';
import PropTypes from 'prop-types';
import deepExtend from 'deep-extend';

export default (WrappedComponent, styles = {}) => {
  const Enhancer = (props) => {
    const computedStyles =
      typeof styles === 'function' ?
        styles(props) :
        styles;
    const style = deepExtend({}, computedStyles, props.style);
    return <WrappedComponent {...props} style={style} />;
  };

  Enhancer.propTypes = {
    style: PropTypes.object,
  };

  Enhancer.defaultProps = {
    style: {},
  };

  Enhancer.displayName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  return Enhancer;
};
