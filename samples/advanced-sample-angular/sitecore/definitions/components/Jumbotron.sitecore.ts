export default (manifest) => {
    manifest.addComponent({
        name: 'Jumbotron',
        displayName: 'Jumbotron',
        fieldEditorFields: ['body'], // explicitly set fields editable in popup editor
        fields: [
            { name: 'titleText', displayName: 'Title Text', type: manifest.fieldTypes.singleLineText },
            { name: 'body', displayName: 'Body', type: manifest.fieldTypes.richText },
        ],
        params: [
            { name: 'titleSize' },
            { name: 'shade' },
        ],
    });
};
