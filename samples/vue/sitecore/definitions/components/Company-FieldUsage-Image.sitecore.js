// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Company-FieldUsage-Image component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'Company-FieldUsage-Image',
    templateName: 'JssVueWeb-Company-FieldUsage-Image',
    icon: SitecoreIcon.PhotoPortrait,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.Image },
      { name: 'sample2', type: CommonFieldTypes.Image },
    ],
    // inherit fields from another template (../templates/Company-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssVueWeb-company-explanatory-component-template'],
  });
}
