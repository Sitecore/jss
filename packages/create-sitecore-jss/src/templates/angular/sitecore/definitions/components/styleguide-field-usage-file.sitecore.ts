import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-File component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageFile(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageFile',
    templateName:
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideFieldUsageFile',
    icon: SitecoreIcon.FloppyDisk,
    fields: [{ name: 'file', type: CommonFieldTypes.File }],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>styleguide-explanatory-component-template',
    ],
  });
}
