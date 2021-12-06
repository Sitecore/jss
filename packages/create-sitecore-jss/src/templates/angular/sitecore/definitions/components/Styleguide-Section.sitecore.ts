import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Section component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideSection(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideSection',
    templateName:
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>StyleguideSection',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'heading', type: CommonFieldTypes.SingleLineText }],
    placeholders: [
      '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>jss-styleguide-section',
    ],
  });
}
