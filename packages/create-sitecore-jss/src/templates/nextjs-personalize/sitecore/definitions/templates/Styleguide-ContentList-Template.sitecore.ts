import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideContentListItemTemplate(manifest: Manifest): void {
  manifest.addTemplate({
    name: 'JssNextWeb-Styleguide-ContentList-Item-Template',
    fields: [{ name: 'textField', type: CommonFieldTypes.SingleLineText }],
  });
}
