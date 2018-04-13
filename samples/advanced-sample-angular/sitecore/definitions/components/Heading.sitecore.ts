import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'Heading',
        displayName: 'Heading',
        fields: [
            { name: 'text', displayName: 'Text', type: CommonFieldTypes.SingleLineText },
        ],
        params: ['size'],
    });
};
