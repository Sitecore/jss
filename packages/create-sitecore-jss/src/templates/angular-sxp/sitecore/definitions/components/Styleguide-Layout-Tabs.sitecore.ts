import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Layout-Tabs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideLayoutTabs(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideLayoutTabs',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>StyleguideLayoutTabs',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['<%- helper.getAppPrefix(appPrefix, appName) %>jss-tabs'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
  });
}
