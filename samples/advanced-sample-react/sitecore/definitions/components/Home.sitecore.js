import { addComponent } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Home',
    displayName: 'Home',
    placeholders: ['page-header', 'page-content'],
  });
};
