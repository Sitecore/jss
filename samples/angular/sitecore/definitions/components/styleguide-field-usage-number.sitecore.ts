import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Number component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageNumber(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageNumber',
    templateName: 'JssAngularWeb-StyleguideFieldUsageNumber',
    icon: SitecoreIcon.NumbersField,
    fields: [{ name: 'sample', type: CommonFieldTypes.Number }],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
