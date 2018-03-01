export default (manifest) => {
    manifest.addComponent({
        name: 'FormContent',
        displayName: 'Form Content',
        fields: [
            { name: 'title', displayName: 'Title', type: manifest.fieldTypes.singleLineText },
            { name: 'body', displayName: 'Body', type: manifest.fieldTypes.richText },
            { name: 'image', displayName: 'Image', type: manifest.fieldTypes.image },
        ],
    });
};
