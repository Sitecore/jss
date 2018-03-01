export default (manifest) => {
    manifest.addComponent({
        name: 'RichText',
        displayName: 'Rich Text',
        displayFieldEditorButton: false, // disable popup editing button
        fields: [
            { name: 'text', displayName: 'Text', type: manifest.fieldTypes.richText },
        ],
    });
};
