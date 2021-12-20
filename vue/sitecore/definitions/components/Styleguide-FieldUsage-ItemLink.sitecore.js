// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import packageJson from '../../../package.json';

/**
 * Adds the Styleguide-FieldUsage-ItemLink component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-ItemLink',
    templateName: 'Styleguide-FieldUsage-ItemLink',
    icon: SitecoreIcon.Link,
    fields: [
      {
        name: 'sharedItemLink',
        type: CommonFieldTypes.ItemLink,
        // this sets the root path in Sitecore that linked items can be selected from.
        // the path is based on the path the shared items are defined in, under /data/content.
        // Using 'source' is recommended to help content editors find the correct items to refer to,
        // unless they can refer to any item in the whole site.
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Styleguide/ItemLinkField`,
      },
      { name: 'localItemLink', type: CommonFieldTypes.ItemLink },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['styleguide-explanatory-component-template'],
  });
}
