import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  manifest.addComponent({
    name: 'Tile',
    fields: [
      {
        name: 'cssclass',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'title',
        type: CommonFieldTypes.SingleLineText,
      },
      { name: 'text', displayName: 'Text', type: CommonFieldTypes.RichText },
      {
        name: 'linkUrl',
        type: CommonFieldTypes.GeneralLink,
      },
      {
        name: 'image',
        displayName: 'Image',
        type: CommonFieldTypes.Image,
      },
    ],
  });
};
