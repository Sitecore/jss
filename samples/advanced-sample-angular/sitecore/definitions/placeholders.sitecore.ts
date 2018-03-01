export default (manifest) => {

  /**
   * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
   * items will be created for any placeholders explicitly added, or discovered in your routes and renderings.
   */
  manifest.addPlaceholder(
    { name: 'main', displayName: 'Main' },
    { name: 'page-header', displayName: 'Page Header' },
    { name: 'page-content', displayName: 'Page Content' },
    { name: 'tab', displayName: 'Tab' },
    { name: 'tabs', displayName: 'Tabs' },
  );
};
