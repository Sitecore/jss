import { isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-vue';
import SitecoreContextFactory from './SitecoreContextFactory';
import SitecoreContentService from './SitecoreContentService';
import App from '../app/App.vue';
import NotFound from '../app/NotFound.vue';
import RouteLoading from '../app/RouteLoading.vue';

// handles routing for a route that points to a Sitecore item
// specifically, retrieving route data for the item and handling when no route exists
// i.e. no matching route in the data provider
export default {
  name: 'route-handler',
  data() {
    if (this.initialState !== null) {
      return { state: this.initialState, notFound: false, loading: false };
    }
    return {
      notFound: true,
    };
  },
  props: {
    route: {
      type: Object,
    },
    initialState: {
      type: Object,
    },
  },
  watch: {
    route(newRoute, oldRoute) {
      // if in experience editor - force reload
      if (isExperienceEditorActive()) {
        window.location.assign(newRoute.path);
        return;
      }

      this.loading = true;
      // get the route data for the new route
      SitecoreContentService.getRouteData(newRoute.path).then((routeData) => {
        if (routeData !== null) {
          // set the sitecore context data and push the new route
          SitecoreContextFactory.setSitecoreContext({
            route: routeData.sitecore.route,
            itemId: routeData.sitecore.route.itemId,
            ...routeData.sitecore.context,
          });
          this.state = routeData;
          this.notFound = false;
        } else {
          this.notFound = true;
        }
        this.loading = false;
      });
    },
  },
  render() {
    if (this.notFound) {
      return <NotFound />;
    }
    if (this.loading) {
      return <RouteLoading />;
    }
    return <App route={this.state.sitecore.route} />;
  },
};
