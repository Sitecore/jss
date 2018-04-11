import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'FormContent',
        displayName: 'Form Content',
        fields: [
            { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
            { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
            { name: 'image', displayName: 'Image', type: CommonFieldTypes.Image },
        ],
    });
};
