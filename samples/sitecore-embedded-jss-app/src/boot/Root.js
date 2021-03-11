// import the babel polyfill here instead of via webpack entry point.
// otherwise, babel-preset-env will essentially try to load babel-polyfill a second time, which is a big no-no.
import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import componentFactory from '../app/componentFactory';
import App from '../app';

class Root extends Component {
  render() {
    return (
      <SitecoreContext
        componentFactory={componentFactory}
        context={this.props.initialState.sitecore.context}
      >
        <App route={this.props.initialState.sitecore.route} />
      </SitecoreContext>
    );
  }
}

Root.propTypes = {
  initialState: PropTypes.object,
  children: PropTypes.node,
};

export default Root;
