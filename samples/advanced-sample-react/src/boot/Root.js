// import the babel polyfill here instead of via webpack entry point.
// otherwise, babel-preset-env will essentially try to load babel-polyfill a second time, which is a big no-no.
import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'app/i18n';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import componentFactory from 'componentFactory';

class Root extends Component {
  componentDidMount() {
    this.props.store.dispatch({ type: 'INITIALIZATION_COMPLETE' });
  }

  render() {
    return (
      <Provider store={this.props.store} >
        <I18nextProvider i18n={i18n}>
          <SitecoreContext componentFactory={componentFactory}>
            {this.props.children}
          </SitecoreContext>
        </I18nextProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Root;
