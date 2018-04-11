import { Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'PageWithHeader',
        displayName: 'Page with Header',
        placeholders: [
            { name: 'page-header' },
            { name: 'page-content' },
        ],
    });
};
