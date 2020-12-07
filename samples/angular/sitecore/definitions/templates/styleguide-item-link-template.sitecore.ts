// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 */
export default function StyleguideItemLinkItemTemplate(manifest: Manifest) {
  manifest.addTemplate({
    name: 'Styleguide-ItemLink-Item-Template',
    fields: [{ name: 'textField', type: CommonFieldTypes.SingleLineText }],
  });
}
