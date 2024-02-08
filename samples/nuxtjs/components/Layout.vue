<template>
  <div class="container">
    <placeholder name="VueApp-jss-main" :rendering="sitecoreRouteData.routeData" />   
  </div>
</template>

<script setup>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
const props = defineProps({
    route: {
      type: Object,
    },
  });
  // import { isEditorActive } from '@sitecore-jss/sitecore-jss-vue';
  import { personalizeLayout } from 'lib/utils/layout-personalizer';
  import { layoutServiceFactory } from '../lib/layout-service-factory';
  import * as config from '../temp/config';
  const route = props.route;
  const ssrInitialState = useState('ssrInitialState');
  let languageState = useState('language');
  const siteName = useState('site');
  console.log('route handler');
  let sitecoreRouteData = {};
  // a very barebones way to read language from path
  // to rework with better i18n integration
  const extractLanguage = (routePath) => {
    if (routePath.startsWith('/en'))
      return 'en';
    if (routePath.startsWith('/da-DK'))
      return 'da-DK';
    return null;
  }

  // We handle Sitecore routes in here
  // Because JSS app routes are defined in Sitecore, traditional static routing isn't enough -
  // we need to load dynamic route data from Sitecore when the client side route changes.
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
  // TODO: move all this route resoultion logic into page props factory
    console.log('updateRouteData');
    let sitecoreRoutePath = route.params.slug ? route.params.slug.join('/') : '/';
    if (!sitecoreRoutePath.startsWith('/')) {
      sitecoreRoutePath = `/${sitecoreRoutePath}`;
    }
    // rudimentary site prefix rewrite
    if (sitecoreRoutePath.startsWith('/site_vue-app')) {
      sitecoreRoutePath = sitecoreRoutePath.replace('/site_vue-app','/');
    }

    const lang = extractLanguage(sitecoreRoutePath) || languageState?.value || ssrInitialState.value?.sitecoreContext?.language;
    sitecoreRoutePath = sitecoreRoutePath.replace(`${lang}/`, '');
    sitecoreRoutePath = sitecoreRoutePath.replace(`/${lang}`, '/');
    const routeDataOverride = useState('routeOverride');
    if (routeDataOverride.value) {
      let routeData = routeDataOverride.value;
      if (routeData.sitecore.route) {
        const path = routeDataOverride.value.sitecoreContext?.itemPath;
        ssrInitialState.value = { routePath: path, ...getSitecoreData(routeData) };
        sitecoreRouteData = { routePath: path, ...getSitecoreData(routeData) };
      }        
    } else {     
      const layoutServiceInstance = layoutServiceFactory.create(siteName.value);
      console.log(sitecoreRoutePath);
      const routeData = await layoutServiceInstance.fetchLayoutData(sitecoreRoutePath, lang);
      const variantId = useState('variantId');
      if (variantId.value) {
        personalizeLayout(routeData, variantId.value);
      }
      if (routeData !== null && routeData.sitecore.route) {
        ssrInitialState.value = { routePath: sitecoreRoutePath, ...getSitecoreData(routeData) };
        sitecoreRouteData = { routePath: sitecoreRoutePath, ...getSitecoreData(routeData) };
      } else {
        ssrInitialState.value = { routePath: sitecoreRoutePath, ...getSitecoreData(routeData) };
        sitecoreRouteData = { routePath: sitecoreRoutePath, ...getSitecoreData(routeData) };
      }  
    };
  // for whatever reason ssrInitialState.value returns undefined at rendering stage
  // so we use sitecoreRouteData
  //console.log(sitecoreRouteData);
  if (!sitecoreRouteData.routeData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    });
  }
</script>

