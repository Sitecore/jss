import { addPlaceholder } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  /**
   * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
   * items will be created for any placeholders explicitly added, or discovered in your routes and renderings.
   */

  addPlaceholder(manifest, { name: 'main', displayName: 'Main' });
};
