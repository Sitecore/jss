// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Link component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-Link',
    templateName: 'Styleguide-FieldUsage-Link',
    icon: SitecoreIcon.Link,
    fields: [
      { name: 'externalLink', type: CommonFieldTypes.GeneralLink },
      { name: 'internalLink', type: CommonFieldTypes.GeneralLink },
      { name: 'emailLink', type: CommonFieldTypes.GeneralLink },
      { name: 'paramsLink', type: CommonFieldTypes.GeneralLink },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['styleguide-explanatory-component-template'],
  });
}
