export default (manifest) => {
  /**
   * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
   * items will be created for any placeholders explicitly added, or discovered in your routes and renderings.
   */

  manifest.addPlaceholder({ name: 'jssdocs-main', displayName: 'Main' });
  manifest.addPlaceholder({ name: 'jssdocs-header', displayName: 'Header' });
  manifest.addPlaceholder({ name: 'jssdocs-footer', displayName: 'Footer' });
};
