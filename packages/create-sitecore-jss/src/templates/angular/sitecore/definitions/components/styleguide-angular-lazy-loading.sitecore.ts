import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Angular-LazyLoading component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideAngularLazyLoading(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideAngularLazyLoading',
    templateName:
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideAngularLazyLoading',
    icon: SitecoreIcon.Gearwheels,
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>styleguide-explanatory-component-template',
    ],
  });
}
