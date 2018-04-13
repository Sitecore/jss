import { addComponent } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Portfolio',
    displayName: 'Portfolio',
    placeholders: ['page-header', 'page-content'],
  });
};
