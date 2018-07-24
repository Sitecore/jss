import Vue from 'vue';
import Meta from 'vue-meta';
import VueApollo from 'vue-apollo';
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue';
import AppRoot from './AppRoot';
import { createRouter } from './router';
import SitecoreJssStorePlugin from './lib/SitecoreJssStorePlugin';
import GraphQLClientFactory from './lib/GraphQLClientFactory';
import config from './temp/config';
import componentFactory from './temp/componentFactory';

Vue.use(Meta);
Vue.use(SitecoreJssStorePlugin);
Vue.use(SitecoreJssPlaceholderPlugin, { componentFactory });
Vue.use(VueApollo);

// createApp is invoked by both the main and SSR entry points, so the two entry points can use the same app creation process.
export function createApp(initialState, i18n) {
  Vue.config.productionTip = false;

  const router = createRouter();
  const graphQLProvider = createGraphQLProvider(initialState);

  const vueOptions = {
    router,
    provide: graphQLProvider.provide(),
    render: (createElement) => createElement(AppRoot),
  };
  // conditionally add i18n to the Vue instance if it is defined
  if (i18n) {
    vueOptions.i18n = i18n;
  }

  const app = new Vue(vueOptions);

  // if there is an initial state defined, push it into the store, where it can be referenced by interested components.
  if (initialState) {
    app.$jss.store.setSitecoreData(initialState);
  }

  return { app, router, graphQLProvider };
}

export function createGraphQLProvider(initialState) {
  const client =
    initialState && initialState.APOLLO_STATE
      ? GraphQLClientFactory(config.graphQLEndpoint, false, initialState.APOLLO_STATE)
      : GraphQLClientFactory(config.graphQLEndpoint, true);

  const provider = new VueApollo({
    defaultClient: client,
  });

  return provider;
}
