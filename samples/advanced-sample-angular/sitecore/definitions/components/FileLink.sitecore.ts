export default (manifest) => {
    manifest.addComponent({
        name: 'FileLink',
        displayName: 'File Link',
        fields: [
            { name: 'file', displayName: 'File', type: manifest.fieldTypes.file }
        ]
    });
};
