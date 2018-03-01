export default (manifest) => {
    manifest.addComponent({
        name: 'Tab',
        displayName: 'Tab',
        fields: [
            { name: 'title', displayName: 'Title', type: manifest.fieldTypes.singleLineText },
        ],
        placeholders: [
            { name: 'tab' },
        ],
    });
};
