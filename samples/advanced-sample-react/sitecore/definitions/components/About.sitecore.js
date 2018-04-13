import { addComponent } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'About',
    displayName: 'About',
    placeholders: [{ name: 'page-header' }, { name: 'page-content' }],
  });
};
