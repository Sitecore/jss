export default (manifest) => {
    manifest.addComponent({
        name: 'DownloadCallout',
        displayName: 'Download Callout',
        fields: [
            { name: 'linkText', displayName: 'Link Text', type: manifest.fieldTypes.singleLineText },
        ],
    });
};
