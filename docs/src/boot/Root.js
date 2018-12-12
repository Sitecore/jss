// import the babel polyfill here instead of via webpack entry point.
// otherwise, babel-preset-env will essentially try to load babel-polyfill a second time, which is a big no-no.
import 'babel-polyfill';
import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Route, Switch } from 'react-router-dom';
import componentFactory from './componentFactory';
import SitecoreContextFactory from './SitecoreContextFactory';
import NotFound from '../app/NotFound';
import RouteHandler from './RouteHandler';

// wrap the app with:
// ApolloProvider: provides GraphQL data fetching services
// SitecoreContext: provides component resolution and context services via withSitecoreContext
// Router: provides a basic routing setup that will resolve Sitecore item routes. This is by no means
//  the only routing setup that will work; this is the most basic setup that will make routes defined in Sitecore resolve correctly
const Root = ({ initialState, path, graphQLClient, Router }) => (
  <SitecoreContext componentFactory={componentFactory} contextFactory={SitecoreContextFactory}>
    <Router location={path} context={{}}>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <RouteHandler initialState={initialState} route={props} />}
        />
        <Route
          path="/**"
          render={(props) => <RouteHandler initialState={initialState} route={props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </SitecoreContext>
);

export default Root;
