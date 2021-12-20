// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Text component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-Text',
    templateName: 'Styleguide-FieldUsage-Text',
    icon: SitecoreIcon.Text,
    fields: [
      { name: 'sample', type: CommonFieldTypes.SingleLineText },
      {
        name: 'sample2',
        displayName: 'Customize Name Shown in Sitecore',
        required: true,
        type: CommonFieldTypes.SingleLineText,
      },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['styleguide-explanatory-component-template'],
  });
}
