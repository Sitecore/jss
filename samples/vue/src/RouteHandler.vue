<template>
  <not-found
    v-if="notFound && !loading && !languageIsChanging"
    :context="appState.sitecoreContext"
  />
  <route-loading v-else-if="loading" />
  <layout v-else :route="appState.routeData" />
</template>

<script>
import { isEditorActive } from '@sitecore-jss/sitecore-jss-vue';
import { layoutServiceFactory } from './lib/layout-service-factory';
import config from './temp/config';

import Layout from './Layout';
import NotFound from './NotFound';
import RouteLoading from './RouteLoading';

// Dynamic route handler for Sitecore items.
// Because JSS app routes are defined in Sitecore, traditional static routing isn't enough -
// we need to load dynamic route data from Sitecore when the client side route changes.
// So vue-router delegates all route rendering to this handler, which attempts to get the right
// route data from Sitecore - and if none exists, renders the not found component.

export default {
  name: 'Route-Handler',
  data() {
    const state = { notFound: true, defaultLanguage: config.defaultLanguage, loading: true };

    // To take advantage of Vue's reactive data for tracking app state changes, we need
    // to reference the same `state` object that the $jss store references in order for mutations to be observed.
    // $jss is attached to the App instance via `SitecoreJssPlugin`.
    const appState = this.$jss.store.state;

    // if the app state has routeData, we don't need to load it and don't need a loading screen
    if (appState.routeData) {
      state.loading = false;
    }

    // route path from vue router - if route was resolved, it's not a 404
    if (this.route !== null) {
      state.notFound = false;
    }

    // if we have an initial SSR state, and that state doesn't have a valid route data,
    // then this is a 404 route.
    if (!appState.routeData) {
      state.notFound = true;
    }

    // if we have initial context data, and that context data has a language defined, set the default language
    // (this makes the language of content follow the Sitecore context language cookie)
    // note that a route-based language (i.e. /de-DE) will override this default; this is for home.
    if (appState.sitecoreContext && appState.sitecoreContext.language) {
      state.defaultLanguage = appState.sitecoreContext.language;
    }

    return { ...state, appState };
  },
  props: {
    route: {
      type: Object,
    },
  },
  created() {
    // if no existing routeData is present (from SSR), get Layout Service fetching the route data
    if (!this.appState.routeData) {
      this.updateRouteData();
    }
    // tell app to sync its current language with the route language
    this.updateLanguage();
  },
  inject: {
    languageIsChanging: {
      type: Boolean,
    },
    changeAppLanguage: {
      type: Function,
    },
  },
  methods: {
    /**
     * Loads route data from Sitecore Layout Service into appState.routeData
     */
    updateRouteData() {
      let sitecoreRoutePath = this.route.params.sitecoreRoute
        ? this.route.params.sitecoreRoute.join('/')
        : '/';
      if (!sitecoreRoutePath.startsWith('/')) {
        sitecoreRoutePath = `/${sitecoreRoutePath}`;
      }

      const language =
        this.route.params.lang || this.appState.sitecoreContext.language || this.defaultLanguage;
      this.loading = true;

      // instantiate layout service
      const layoutServiceInstance = layoutServiceFactory.create();
      // get the route data for the new route
      layoutServiceInstance.fetchLayoutData(sitecoreRoutePath, language).then((routeData) => {
        if (routeData !== null && routeData.sitecore.route) {
          // Update the JSS store instance with the fetched data.
          // This will signal the RouteHandler to update/re-render, as well as any components
          // that are referencing the JSS store instance in their `data` object.
          this.$jss.store.setSitecoreData(routeData);
          this.notFound = false;
        } else {
          this.$jss.store.setSitecoreData(routeData);
          this.notFound = true;
        }
        this.loading = false;
      });
    },
    /**
     * Updates the current app language to match the route data.
     */
    updateLanguage() {
      const newLanguage =
        this.route.params.lang || this.appState.sitecoreContext.language || this.defaultLanguage;
      // `changeAppLanguage` is "inject"-ed from AppRoot
      this.changeAppLanguage(newLanguage);
    },
  },
  watch: {
    // watch for a change in the 'route' prop
    route(newRoute, oldRoute) {
      // if the route contains a hash value, assume the URL is a named anchor/bookmark link, e.g. /page#anchorId.
      // in that scenario, we don't want to fetch new route data but instead allow default browser behavior.
      if (newRoute.hash !== '' && newRoute.path === oldRoute.path) {
        return;
      }
      // if in Sitecore editor - force reload instead of route data update
      // avoids confusing Sitecore's editing JS
      if (isEditorActive()) {
        window.location.assign(newRoute.path);
        return;
      }

      this.updateLanguage();
      this.updateRouteData();
    },
  },
  components: {
    Layout,
    NotFound,
    RouteLoading,
  },
};
</script>
