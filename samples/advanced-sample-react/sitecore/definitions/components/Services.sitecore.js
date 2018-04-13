import { addComponent } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Services',
    displayName: 'Services',
    placeholders: ['page-header', 'page-content'],
  });
};
