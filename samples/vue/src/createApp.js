import { createApp as createVueApp, h, createSSRApp } from 'vue';
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import {
  createMetaManager as createVueMetaManager,
  defaultConfig,
  deepestResolver,
} from 'vue-meta';
import AppRoot from './AppRoot';
import { createRouter } from './router';
import SitecoreJssStorePlugin from './lib/SitecoreJssStorePlugin';
import GraphQLClientFactory from './lib/GraphQLClientFactory';
import config from './temp/config';
import componentFactory from './temp/componentFactory';

const createMetaManager = (isSSR = false) =>
  createVueMetaManager(
    isSSR,
    {
      ...defaultConfig,
    },
    deepestResolver
  );

// createApp is invoked by both the main and SSR entry points, so the two entry points can use the same app creation process.
export function createApp(initialState, i18n, isSSR) {
  const router = createRouter(isSSR);
  const metaManager = createMetaManager(isSSR);
  const graphQLProvider = createGraphQLProvider(initialState);

  const vueOptions = {
    router,
    render: () => h(AppRoot),
    i18n,
  };

  const app = isSSR ? createSSRApp(vueOptions) : createVueApp(vueOptions);

  app.provide(DefaultApolloClient, graphQLProvider);

  app.use(router);
  app.use(SitecoreJssStorePlugin);
  app.use(SitecoreJssPlaceholderPlugin, { componentFactory });
  app.use(i18n);
  app.use(metaManager);

  // if there is an initial state defined, push it into the store, where it can be referenced by interested components.
  if (initialState) {
    app.config.globalProperties.$jss.store.setSitecoreData(initialState);
  }

  return { app, router, graphQLProvider };
}

export function createGraphQLProvider(initialState) {
  const client =
    initialState && initialState.APOLLO_STATE
      ? GraphQLClientFactory(config.graphQLEndpoint, false, initialState.APOLLO_STATE)
      : GraphQLClientFactory(config.graphQLEndpoint, true);

  return client;
}
