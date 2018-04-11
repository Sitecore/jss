import { addComponent, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Chat',
    displayName: 'Chat',
    fields: [{ name: 'title', type: CommonFieldTypes.SingleLineText }],
  });
};
