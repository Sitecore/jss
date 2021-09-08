// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Number component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'JssReactWeb-Styleguide-FieldUsage-Number',
    displayName: 'Styleguide-FieldUsage-Number',
    icon: SitecoreIcon.NumbersField,
    fields: [{ name: 'sample', type: CommonFieldTypes.Number }],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssReactWeb-styleguide-explanatory-component-template'],
  });
}
