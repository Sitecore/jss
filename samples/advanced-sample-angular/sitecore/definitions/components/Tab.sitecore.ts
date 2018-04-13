import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'Tab',
        displayName: 'Tab',
        fields: [
            { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
        ],
        placeholders: [
            { name: 'tab' },
        ],
    });
};
