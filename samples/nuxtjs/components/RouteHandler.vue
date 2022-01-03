<template>
  <div>
    <NotFound
      v-if="state.notFound && !state.loading && !state.languageIsChanging"
      :context="ssrInitialState?.sitecoreContext"
    />
    <RouteLoading v-else-if="state && state.loading" />
    <Layout v-else :route="ssrInitialState?.routeData" />
  </div>
</template>
<script>
// import { isEditorActive } from '@sitecore-jss/sitecore-jss-vue';
import { layoutServiceFactory } from '../lib/layout-service-factory';
import config from '../temp/config';

// Dynamic route handler for Sitecore items.
// Because JSS app routes are defined in Sitecore, traditional static routing isn't enough -
// we need to load dynamic route data from Sitecore when the client side route changes.
// So vue-router delegates all route rendering to this handler, which attempts to get the right
// route data from Sitecore - and if none exists, renders the not found component.

const getSitecoreData = (sitecoreData) => {
  const route = sitecoreData.sitecore && sitecoreData.sitecore.route;
  const context = (sitecoreData.sitecore && sitecoreData.sitecore.context) || {};

  return {
    routeData: route,
    sitecoreContext: {
      ...context,
      routeName: route && route.name,
      itemId: route && route.itemId,
    },
  };
};

export default {
  name: 'Route-Handler',
  props: {
    route: {
      type: Object,
    },
  },
  setup(props) {
    const ssrInitialState = useState('ssrInitialState');
    const state = ref({ notFound: true, defaultLanguage: config.defaultLanguage, loading: true });
    let languageState = useState('language');

    function updateRouteData() {
      let sitecoreRoutePath = props.route.params.slug ? props.route.params.slug.join('/') : '/';
      if (!sitecoreRoutePath.startsWith('/')) {
        sitecoreRoutePath = `/${sitecoreRoutePath}`;
      }

      const lang = languageState?.value || ssrInitialState.value?.sitecoreContext?.language;

      sitecoreRoutePath = sitecoreRoutePath.replace(`${lang}/`, '');

      const layoutServiceInstance = layoutServiceFactory.create();

      layoutServiceInstance.fetchLayoutData(sitecoreRoutePath, lang).then((routeData) => {
        if (routeData !== null && routeData.sitecore.route) {
          ssrInitialState.value = { routePath: sitecoreRoutePath, ...getSitecoreData(routeData) };
          state.value.notFound = false;
        } else {
          ssrInitialState.value = { routePath: sitecoreRoutePath, ...getSitecoreData(routeData) };
          state.value.notFound = true;
        }

        state.value.loading = false;
      });
    }

    onMounted(() => {
      if (
        !ssrInitialState.value?.routeData ||
        ssrInitialState.value?.routePath !== props.route.path
      ) {
        state.value.loading = true;
        updateRouteData();
      }
    });

    return { ssrInitialState, state };
  },
};
</script>
