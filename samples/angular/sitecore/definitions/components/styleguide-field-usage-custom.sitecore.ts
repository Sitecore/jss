import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Custom component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageCustom(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageCustom',
    templateName: 'JssAngularWeb-StyleguideFieldUsageCustom',
    icon: SitecoreIcon.Gearwheel,
    // NOTE: not using 'CommonFieldTypes' here, because it's a custom field.
    // The 'Integer' field ships with Sitecore; something really custom would need to be
    // implemented as a Sitecore field type as well.
    fields: [{ name: 'customIntField', type: 'Integer' }],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
