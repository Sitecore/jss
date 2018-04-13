import { addPlaceholder } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  /**
   * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
   * items will be created for any placeholders explicitly added, or discovered in your routes and renderings.
   */

  addPlaceholder(
    manifest,
    { name: 'main', displayName: 'Main' },
    { name: 'page-header', displayName: 'Page Header' },
    { name: 'page-content', displayName: 'Page Content' },
    { name: 'tab', displayName: 'Tab' },
    // you can optionally pass a GUID or unique (app-wide) string as an ID
    // this will inform the ID that is set when imported into Sitecore.
    // If the ID is not set, an ID is created based on the placeholder name.
    { name: 'tabs', displayName: 'Tabs', id: 'tabs-placeholder' }
  );
};
