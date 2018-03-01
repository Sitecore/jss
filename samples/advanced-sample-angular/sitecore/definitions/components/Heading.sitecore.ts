export default (manifest) => {
    manifest.addComponent({
        name: 'Heading',
        displayName: 'Heading',
        fields: [
            { name: 'text', displayName: 'Text', type: manifest.fieldTypes.singleLineText },
        ],
        params: [
            { name: 'size' },
        ],
    });
};
