import { Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'Tabs',
        displayName: 'Tabs',
        placeholders: ['tabs'],
    });
};
