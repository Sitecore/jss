import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the StyleguideRouteFields component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideRouteFields(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideRouteFields',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>StyleguideRouteFields',
    icon: SitecoreIcon.TextField,
    // this component gets all of its fields from the _route_,
    // so it does not need any local fields defined.

    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
  });
}
