import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Route, Routes, useParams } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import componentFactory from './temp/componentFactory';
import RouteHandler from './RouteHandler';

// This is the main JSX entry point of the app invoked by the renderer (server or client rendering).
// By default the app's normal rendering is delegated to <RouteHandler> that handles the loading of JSS route data.

// support languages in the URL prefix
// e.g. /da-DK/path, or /en/path, or /path
const LANGUAGE_REG_EXP = /^\/?(([a-z]{2}-[A-Z]{2})|([a-z]{2}))(\/|$)/g;

export const parseRouteParams = (url) => {
  const language = url.match(LANGUAGE_REG_EXP);
  const route = url.replace(LANGUAGE_REG_EXP, '');

  return {
    route: route.startsWith('/') ? route : `/${route}`,
    language: language ? language[0].replace(/\//g, '') : undefined,
  };
};

const JssRoute = (props) => {
  const params = useParams();
  const url = params['*'];

  return <RouteHandler {...parseRouteParams(url)} url={url} isSSR={props.isSSR} />;
};
// wrap the app with:
// ApolloProvider: provides an instance of Apollo GraphQL client to the app to make Connected GraphQL queries.
//    Not needed if not using connected GraphQL.
// SitecoreContext: provides component resolution and context services via withSitecoreContext
// Router: provides a basic routing setup that will resolve Sitecore item routes and allow for language URL prefixes.
class AppRoot extends React.Component {
  render() {
    const { path, Router, graphQLClient } = this.props;

    return (
      <ApolloProvider client={graphQLClient}>
        <SitecoreContext componentFactory={componentFactory} layoutData={this.props.ssrState}>
          <Router location={path} context={{}}>
            <Routes>
              <Route path="*" element={<JssRoute isSSR={!!this.props.ssrState} />} />
            </Routes>
          </Router>
        </SitecoreContext>
      </ApolloProvider>
    );
  }
}

export default AppRoot;
