import { addComponent, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'ConnectedPage',
    displayName: 'Connected Page',
    icon: SitecoreIcon.GraphConnection,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.RichText },
      { name: 'logoImage', type: CommonFieldTypes.Image },
    ],
  });
};
