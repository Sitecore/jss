import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'DownloadCallout',
        displayName: 'Download Callout',
        fields: [
            { name: 'linkText', displayName: 'Link Text', type: CommonFieldTypes.SingleLineText },
        ],
    });
};
