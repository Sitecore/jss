import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-EditFrame component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideEditFrame(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideEditFrame',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'description', type: CommonFieldTypes.RichText},
      { name: 'applyRedToText', type: CommonFieldTypes.Checkbox},
      { name: 'sampleList', type: CommonFieldTypes.ContentList},
    ],
  });
}
