import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'RichText',
        displayName: 'Rich Text',
        displayFieldEditorButton: false, // disable popup editing button
        fields: [
            { name: 'text', displayName: 'Text', type: CommonFieldTypes.RichText },
        ],
    });
};
