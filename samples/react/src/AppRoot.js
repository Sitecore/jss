import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import componentFactory from './temp/componentFactory';
import RouteHandler from './RouteHandler';

// This is the main JSX entry point of the app invoked by the renderer (server or client rendering).
// By default the app's normal rendering is delegated to <RouteHandler> that handles the loading of JSS route data.

// support languages in the URL prefix
// e.g. /da-DK/path, or /en/path, or /path
export const routePatterns = [
  '/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*',
  '/:lang([a-z]{2})/:sitecoreRoute*',
  '/:sitecoreRoute*',
];

// wrap the app with:
// ApolloProvider: provides an instance of Apollo GraphQL client to the app to make Connected GraphQL queries.
//    Not needed if not using connected GraphQL.
// SitecoreContext: provides component resolution and context services via withSitecoreContext
// Router: provides a basic routing setup that will resolve Sitecore item routes and allow for language URL prefixes.
class AppRoot extends React.Component {
  renderRoute = (props) => {
    return <RouteHandler route={props} isSSR={!!this.props.ssrState} />;
  };

  render() {
    const { path, Router, graphQLClient } = this.props;

    return (
      <ApolloProvider client={graphQLClient}>
        <SitecoreContext componentFactory={componentFactory} layoutData={this.props.ssrState}>
          <Router location={path} context={{}}>
            <Switch>
              <Route path="/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*" render={this.renderRoute} />
              <Route path="/:lang([a-z]{2})/:sitecoreRoute*" render={this.renderRoute} />
              <Route path="/:sitecoreRoute*" render={this.renderRoute} />
            </Switch>
          </Router>
        </SitecoreContext>
      </ApolloProvider>
    );
  }
}

export default AppRoot;
