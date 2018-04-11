import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'Jumbotron',
        displayName: 'Jumbotron',
        fieldEditorFields: ['body'], // explicitly set fields editable in popup editor
        fields: [
            { name: 'titleText', displayName: 'Title Text', type: CommonFieldTypes.SingleLineText },
            { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
        ],
        params: ['titleSize', 'shade'],
    });
};
