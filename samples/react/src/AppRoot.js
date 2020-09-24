import React from 'react';
import { SitecoreContext, SitecoreContextFactory } from '@sitecore-jss/sitecore-jss-react';
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
  constructor(props) {
    super(props);
    
    this.state = {
      ssrRenderComplete: false,
      contextFactory: new SitecoreContextFactory()
    }

    if (props.ssrState && props.ssrState.sitecore && props.ssrState.sitecore.route) {
      // set the initial sitecore context data if we got SSR initial state
      this.state.contextFactory.setSitecoreContext({
        route: props.ssrState.sitecore.route,
        itemId: props.ssrState.sitecore.route.itemId,
        ...props.ssrState.sitecore.context,
      });
    } else if (props.ssrState) {
      this.state.contextFactory.setSitecoreContext(props.ssrState.sitecore.context)
    } else {
      this.state.contextFactory.setSitecoreContext(null);
    }
  }

  setSsrRenderComplete = ssrRenderComplete => (
    this.setState({
      ssrRenderComplete
    })
  )

  render() {
    const { path, Router, graphQLClient } = this.props;

    const routeRenderFunction = (props) => 
      <RouteHandler
        route={props}
        ssrRenderComplete={this.state.ssrRenderComplete}
        setSsrRenderComplete={this.setSsrRenderComplete}
      />;
    return (
      <ApolloProvider client={graphQLClient}>
        <SitecoreContext componentFactory={componentFactory} contextFactory={this.state.contextFactory}>
          <Router location={path} context={{}}>
            <Switch>
              {routePatterns.map((routePattern) => (
                <Route key={routePattern} path={routePattern} render={routeRenderFunction} />
              ))}
            </Switch>
          </Router>
        </SitecoreContext>
      </ApolloProvider>
    );
  }
}

export default AppRoot;
