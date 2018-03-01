export default (manifest) => {
    manifest.addComponent({
        name: 'LinkButton',
        displayName: 'Link Button',
        fields: [
            { name: 'link', displayName: 'Link', type: manifest.fieldTypes.generalLink }
        ]
    });
};
