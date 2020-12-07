import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Date component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageDate(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageDate',
    icon: SitecoreIcon.Clock,
    fields: [
      { name: 'date', type: CommonFieldTypes.Date },
      { name: 'dateTime', type: CommonFieldTypes.DateTime },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['styleguide-explanatory-component-template'],
  });
}
