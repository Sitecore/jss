import Vue from 'vue';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-vue';
import Router from 'vue-router';
import componentFactory from '../app/componentFactory';
import RouteHandler from './RouteHandler';
import NotFound from '../app/NotFound.vue';

// tell Vue to use vue-router as a plugin
Vue.use(Router);

function createRouter(initialState) {
  // create an instance of vue-router and configure routes to use the RouteHandler component
  return new Router({
    mode: 'history',
    routes: [
      { path: '/*', component: RouteHandler, props: (route) => ({ route, initialState }) },
      { path: '*', component: NotFound },
    ],
  });
}

export function createApp(initialState = { sitecore: { route: {} } }) {
  const router = createRouter(initialState);

  // wrap the app with:
  // SitecoreContext: provides component resolution and context services via withSitecoreContext
  // router-view: provides a basic routing setup that will resolve Sitecore item routes. This is by no means
  //  the only routing setup that will work; this is the most basic setup that will make routes defined in Sitecore resolve correctly

  const app = new Vue({
    router,
    render(createElement) {
      // '<router-view />' is a "global" component that is injected into the Vue component registry by vue-router
      return (
        <SitecoreContext componentFactory={componentFactory}>
          <router-view />
        </SitecoreContext>
      );
    },
  });

  return { app, router };
}
