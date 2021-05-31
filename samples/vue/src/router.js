import { createRouter as createVueRouter, createWebHistory, createMemoryHistory } from 'vue-router';

import RouteHandler from './RouteHandler.vue';

// support languages in the URL prefix
// e.g. /da-DK/path, or /en/path, or /path
export const routePatterns = [
  '/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*',
  '/:lang([a-z]{2})/:sitecoreRoute*',
  '/:sitecoreRoute*',
];

export function createRouter(isSSR) {
  // create an instance of vue-router and configure routes to use the RouteHandler component
  return createVueRouter({
    history: isSSR ? createMemoryHistory() : createWebHistory(),
    routes: routePatterns.map((routePattern) => {
      return {
        path: routePattern,
        component: RouteHandler,
        props: (route) => ({
          route,
        }),
      };
    }),
  });
}
