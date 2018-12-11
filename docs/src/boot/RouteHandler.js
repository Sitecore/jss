import React from 'react';
import { isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-react';
import SitecoreContextFactory from './SitecoreContextFactory';
import SitecoreContentService from './SitecoreContentService';
import App from '../app';
import NotFound from '../app/NotFound';

// handles routing for a route that points to a Sitecore item
// specifically, retrieving route data for the item and handling when no route exists
// i.e. no matching route in the data provider
export default class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    if (props.initialState !== null) {
      this.state = {
        state: props.initialState,
        notFound: false,
      };
    } else {
      this.state = { notFound: true };
    }
  }

  componentWillReceiveProps(newProps) {
    const existingRoute = this.props.route.match.url;
    const newRoute = newProps.route.match.url;

    if (existingRoute !== newRoute) {
      // if in experience editor - force reload
      if (isExperienceEditorActive()) {
        window.location.assign(newRoute);
        return;
      }

      // get the route data for the new route
      SitecoreContentService.getRouteData(newRoute).then((routeData) => {
        if (routeData !== null) {
          // set the sitecore context data and push the new route
          SitecoreContextFactory.setSitecoreContext({
            route: routeData.sitecore.route,
            itemId: routeData.sitecore.route.itemId,
            ...routeData.sitecore.context,
          });

          this.setState({ state: routeData, notFound: false });
          window.scrollTo(0, 0);
        } else {
          this.setState({ notFound: true });
        }
      });
    }
  }

  render() {
    if (this.state.notFound) {
      return <NotFound />;
    }

    return <App routeData={this.state.state.sitecore.route} />;
  }
}
