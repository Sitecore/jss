import { addComponent, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-dev-tools';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Welcome',
    displayName: 'Welcome',
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.RichText },
      { name: 'logoImage', type: CommonFieldTypes.Image },
    ],
  });
};
