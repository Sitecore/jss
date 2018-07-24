const store = {
  // default state
  state: {
    sitecoreContext: {
      pageEditing: false,
    },
    routeData: null,
  },
  setSitecoreData(sitecoreData) {
    // Do not replace the original state object - the store and any components that use the store
    // need to share a reference to the same object in order for mutations to be observed.
    this.state.routeData = sitecoreData.sitecore.route;
    this.state.sitecoreContext = {
      ...sitecoreData.sitecore.context,
      routeName: sitecoreData.sitecore.route.name,
      itemId: sitecoreData.sitecore.route.itemId,
    };
  },
};

// Vue plugins must export a function named 'install'
function install(Vue) {
  // "standard" convention for Vue plugins to ensure they are only installed once.
  if (install.installed) {
    return;
  }
  install.installed = true;

  Vue.prototype.$jss = {
    // there may be other JSS plugins installed, merge existing properties
    ...Vue.prototype.$jss,
    store,
    sitecoreContext() {
      // this is intended only as a convenience function for easier access to the current context.
      return store.state.sitecoreContext;
    },
    routeData() {
      // this is intended only as a convenience function for easier access to the current routeData.
      return store.state.routeData;
    },
  };
}

export default { install };
