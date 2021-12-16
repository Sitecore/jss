// eslint-disable-next-line no-unused-vars
import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Layout-Tabs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'Styleguide-Layout-Tabs',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>Styleguide-Layout-Tabs',
    icon: SitecoreIcon.DocumentTag,
    placeholders: [' <%- helper.getAppPrefix(appPrefix, appName) %>jss-tabs'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template'],
  });
}
