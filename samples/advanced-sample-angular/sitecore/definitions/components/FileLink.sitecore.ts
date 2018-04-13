import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'FileLink',
        displayName: 'File Link',
        fields: [
            { name: 'file', displayName: 'File', type: CommonFieldTypes.File }
        ]
    });
};
