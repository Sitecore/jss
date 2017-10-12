import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import { NOT_FOUND_ROUTE, SERVER_ERROR_ROUTE, SITECORE_ROUTES } from 'app/constants';
import { commonComponent } from 'enhancers';
import MainNav from 'mainNav/components/MainNav';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'assets/css/app.css';

import Page from './Page';
import NotFound from './NotFound';
import ServerError from './ServerError';

const App = ({ style, actions, rendering, lang, sitecoreContext, metaTitle, routeFields, t }) => (
  <div style={style}>
    <Helmet
      htmlAttributes={{ lang }}
      titleTemplate={`%s | ${t('Sitecore JSS')}`}
      title={metaTitle ? metaTitle.value : ''}
      defaultTitle={t('Sitecore JSS')}
    />
    <MainNav actions={actions} />
    <Switch>
      <Route exact path={NOT_FOUND_ROUTE} component={NotFound} />
      <Route exact path={SERVER_ERROR_ROUTE} component={ServerError} />
      {SITECORE_ROUTES.map(path =>
        <Route key={path} path={path} render={routeProps => <Page {...routeProps} actions={actions} rendering={rendering} routeFields={routeFields} sitecoreContext={sitecoreContext} />} />
      )}
      <Route component={NotFound} />
    </Switch>
    <div className="copyright">
      &copy; {t('Copyright', { year: new Date().getFullYear() })}
    </div>
  </div>
);

App.propTypes = {
  style: PropTypes.object,
  rendering: PropTypes.object,
  actions: PropTypes.object,
  lang: PropTypes.string,
  sitecoreContext: PropTypes.object,
  metaTitle: PropTypes.object,
  routeFields: PropTypes.object,
  t: PropTypes.func,
};

App.styles = {
  height: '100%',
};

App.displayName = 'App';

export default translate()(commonComponent(App));
