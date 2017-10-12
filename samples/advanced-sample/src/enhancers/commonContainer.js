import React, { Component } from 'react';
import PropTypes from 'prop-types';

const commonContainer = (WrappedComponent) => {
  class Wrapper extends Component {
    componentWillMount() {
      if (this.props.actions && this.props.actions.onComponentMounting) {
        this.props.actions.onComponentMounting(WrappedComponent.displayName);
      }
    }

    componentDidMount() {
      if (this.props.actions && this.props.actions.onComponentMounted) {
        this.props.actions.onComponentMounted(WrappedComponent.displayName);
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Wrapper.propTypes = {
    actions: PropTypes.object,
  };

  return Wrapper;
};

export default commonContainer;
