import { addComponent, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Home',
    displayName: 'Home',
    placeholders: ['jss-main'],
    fields: [
      { name: 'styleguideLink', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.RichText },
    ],
  });
};
