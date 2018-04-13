import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'LinkButton',
        displayName: 'Link Button',
        fields: [
            { name: 'link', displayName: 'Link', type: CommonFieldTypes.GeneralLink }
        ]
    });
};
