import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-ComponentParams component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideComponentParams(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideComponentParams',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>StyleguideComponentParams',
    icon: SitecoreIcon.WindowDialog,
    params: ['cssClass', 'columns', 'useCallToAction'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
  });
}
