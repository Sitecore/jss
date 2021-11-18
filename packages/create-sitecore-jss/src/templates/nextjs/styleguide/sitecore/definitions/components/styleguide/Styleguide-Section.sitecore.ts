import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Section component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideSection(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-Section',
    templateName: '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>Styleguide-Section',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'heading', type: CommonFieldTypes.SingleLineText }],
    placeholders: ['<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>jss-styleguide-section'],
  });
}
