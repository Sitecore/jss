import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-RichText component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideFieldUsageRichText(manifest: Manifest): void {
  manifest.addComponent({
    name: 'JssNextWeb-Styleguide-FieldUsage-RichText',
    displayName: 'Styleguide-FieldUsage-RichText',
    icon: SitecoreIcon.TextField,
    fields: [
      { name: 'sample', type: CommonFieldTypes.RichText },
      {
        name: 'sample2',
        displayName: 'Customize Name Shown in Sitecore',
        required: true,
        type: CommonFieldTypes.RichText,
      },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['jssnextweb-styleguide-explanatory-component-template'],
  });
}
