import { defineNuxtPlugin } from '#app';
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue';
import componentFactory from '../temp/componentFactory';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SitecoreJssPlaceholderPlugin, { componentFactory })
});
