import React from 'react';
import i18n from 'i18next';
import Helmet from 'react-helmet';
import { isExperienceEditorActive, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { dataFetcher } from './dataFetcher';
import { getHostname } from './util';
import { layoutService } from './lib/layout-service';
import config from './temp/config';
import Layout from './Layout';
import NotFound from './NotFound';

/* eslint-disable no-console */

// Dynamic route handler for Sitecore items.
// Because JSS app routes are defined in Sitecore, traditional static React routing isn't enough -
// we need to be able to load dynamic route data from Sitecore after the client side route changes.
// So react-router delegates all route rendering to this handler, which attempts to get the right
// route data from Sitecore - and if none exists, renders the not found component.

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notFound: true,
      defaultLanguage: config.defaultLanguage,
    };

    const routeData = this.extractRouteData();

    // route data from react-router - if route was resolved, it's not a 404
    if (props.route !== null) {
      this.state.notFound = false;
    }

    // if we have an initial SSR state, and that state doesn't have a valid route data,
    // then this is a 404 route.
    if (routeData && (!routeData.sitecore || !routeData.sitecore.route)) {
      this.state.notFound = true;
    }

    // if we have an SSR state, and that state has language data, set the current language
    // (this makes the language of content follow the Sitecore context language cookie)
    // note that a route-based language (i.e. /de-DE) will override this default; this is for home.
    if (
      routeData &&
      routeData.sitecore &&
      routeData.sitecore.context &&
      routeData.sitecore.context.language
    ) {
      this.state.defaultLanguage = routeData.sitecore.context.language;
    }

    // tell i18next to sync its current language with the route language
    this.updateLanguage();
  }

  componentDidMount() {
    const routeData = this.extractRouteData();

    // if no existing routeData is present (from SSR), get Layout Service fetching the route data or ssr render complete
    if (!routeData || this.props.ssrRenderComplete) {
      this.updateRouteData();
    }
  }

  extractRouteData = () => {
    if (!this.props.sitecoreContext) return null;

    const { route, ...context } = this.props.sitecoreContext;

    return {
      sitecore: {
        route,
        context,
      },
    };
  };

  /**
   * Loads route data from Sitecore Layout Service into state.routeData
   */
  updateRouteData() {
    let sitecoreRoutePath = this.props.route.match.params.sitecoreRoute || '/';
    if (!sitecoreRoutePath.startsWith('/')) {
      sitecoreRoutePath = `/${sitecoreRoutePath}`;
    }

    const language = this.props.route.match.params.lang || this.state.defaultLanguage;

    // get the route data for the new route
    layoutService.fetchLayoutData(sitecoreRoutePath, language).then((routeData) => {
      if (routeData !== null && routeData.sitecore && routeData.sitecore.route) {
        // set the sitecore context data and push the new route
        this.props.updateSitecoreContext({
          route: routeData.sitecore.route,
          itemId: routeData.sitecore.route.itemId,
          ...routeData.sitecore.context,
        });
        this.setState({ notFound: false });
      } else {
        this.setState({ notFound: true }, () => {
          const context = routeData && routeData.sitecore ? routeData.sitecore.context : null;

          this.props.updateSitecoreContext(context);
        });
      }
    });
  }

  /**
   * Updates the current app language to match the route data.
   */
  updateLanguage() {
    const newLanguage = this.props.route.match.params.lang || this.state.defaultLanguage;

    if (i18n.language !== newLanguage) {
      i18n.changeLanguage(newLanguage);
    }
  }

  componentDidUpdate(previousProps) {
    const existingRoute = previousProps.route.match.url;
    const newRoute = this.props.route.match.url;

    // don't change state (refetch route data) if the route has not changed
    if (existingRoute === newRoute) {
      return;
    }

    // if in experience editor - force reload instead of route data update
    // avoids confusing Sitecore's editing JS
    if (isExperienceEditorActive()) {
      window.location.assign(newRoute);
      return;
    }

    this.updateLanguage();
    this.updateRouteData();
  }

  render() {
    const { notFound } = this.state;
    const routeData = this.extractRouteData();

    // no route data for the current route in Sitecore - show not found component.
    // Note: this is client-side only 404 handling. Server-side 404 handling is the responsibility
    // of the server being used (i.e. node-headless-ssr-proxy and Sitecore intergrated rendering know how to send 404 status codes).
    if (notFound && routeData) {
      return (
        <div>
          <Helmet>
            <title>{i18n.t('Page not found')}</title>
          </Helmet>
          <NotFound context={routeData.sitecore && routeData.sitecore.context} />
        </div>
      );
    }

    // Don't render anything if the route data or dictionary data is not fully loaded yet.
    // This is a good place for a "Loading" component, if one is needed.
    if (!routeData) {
      return null;
    }

    // Render the app's root structural layout
    return <Layout route={routeData.sitecore.route} />;
  }
}

export default withSitecoreContext({ updatable: true })(RouteHandler);
