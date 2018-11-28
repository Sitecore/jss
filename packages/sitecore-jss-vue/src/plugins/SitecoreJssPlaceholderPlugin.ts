import _Vue, { PluginObject } from 'vue';
import { ComponentFactory } from '../components/sharedTypes';
import { providePlaceholders } from '../enhancers/providePlaceholders';

export interface SitecoreJssPlaceholderPluginOptions {
  componentFactory?: ComponentFactory;
}

// Vue plugins must export a function named 'install'
function install(Vue: typeof _Vue, options?: SitecoreJssPlaceholderPluginOptions) {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$jss = {
    // there may be other JSS plugins installed
    ...Vue.prototype.$jss,
    componentFactory: options && options.componentFactory,
  };

  Vue.mixin({
    beforeCreate() {
      providePlaceholders(this, options && options.componentFactory);
    },
  });
}

export const SitecoreJssPlaceholderPlugin: PluginObject<SitecoreJssPlaceholderPluginOptions> = {
  install,
  key: 'SitecoreJssPlaceholderPlugin',
};

declare module 'vue/types/vue' {
  export interface Vue {
    $jss: {
      componentFactory?: ComponentFactory;
    };
  }
}
