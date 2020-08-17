import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
const packageJson = require('../../../package.json');

/**
 * Adds the Styleguide-FieldUsage-ItemLink component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageItemLink(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageItemLink',
    icon: SitecoreIcon.Link,
    fields: [
      {
        name: 'sharedItemLink',
        type: CommonFieldTypes.ItemLink,
        // this sets the root path in Sitecore that linked items can be selected from.
        // the path is based on the path the shared items are defined in, under /data/content.
        // Using 'source' is recommended to help content editors find the correct items to refer to,
        // unless they can refer to any item in the whole site.
        source: `dataSource=/sitecore/content/${(packageJson as any).config.appName}/Content/Styleguide/ItemLinkField`,
      },
      { name: 'localItemLink', type: CommonFieldTypes.ItemLink },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['styleguide-explanatory-component-template'],
  });
}
