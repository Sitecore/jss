import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Layout-Tabs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideLayoutTabs(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideLayoutTabs',
    templateName:
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideLayoutTabs',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>jss-tabs'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>styleguide-explanatory-component-template',
    ],
  });
}
