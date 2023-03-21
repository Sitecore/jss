// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-EditFrame component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideEditFrame(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-EditFrame',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'description', type: CommonFieldTypes.RichText },
      { name: 'applyRedToText', type: CommonFieldTypes.Checkbox },
      { name: 'sampleList', type: CommonFieldTypes.ContentList },
    ],
    templateName: 'NextjsApp-Styleguide-EditFrame',
  });
}
