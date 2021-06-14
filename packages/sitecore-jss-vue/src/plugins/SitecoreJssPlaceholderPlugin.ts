import { Plugin } from 'vue';
import { ComponentFactory } from '../components/sharedTypes';
import { providePlaceholders } from '../enhancers/providePlaceholders';

export interface SitecoreJssPlaceholderPluginOptions {
  componentFactory?: ComponentFactory;
}

/**
 * Vue plugins must export a function named 'install'
 *
 * @param {App} app
 * @param {SitecoreJssPlaceholderPluginOptions} options
 */
function install(app, options?: SitecoreJssPlaceholderPluginOptions) {
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$jss = {
    // there may be other JSS plugins installed
    ...app.config.globalProperties.$jss,
    componentFactory: options && options.componentFactory,
  };

  app.mixin({
    beforeCreate() {
      providePlaceholders(this, options && options.componentFactory);
    },
  });
}

export const SitecoreJssPlaceholderPlugin: Plugin & SitecoreJssPlaceholderPluginOptions = {
  install,
};

declare module 'vue/dist/vue' {
  export interface Vue {
    $jss: {
      componentFactory?: ComponentFactory;
    };
  }
}
