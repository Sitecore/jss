export default (manifest) => {
    manifest.addComponent({
        name: 'PageWithHeader',
        displayName: 'Page with Header',
        placeholders: [
            { name: 'page-header' },
            { name: 'page-content' },
        ],
    });
};
