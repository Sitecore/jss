export default (manifest) => {
    manifest.addComponent({
        name: 'Carousel',
        displayName: 'Carousel',
        fields: [
            { name: 'items', displayName: 'Items', type: manifest.fieldTypes.contentList },
        ],
    });

    manifest.addComponent({
        name: 'Carousel-items-Item',
        displayName: 'Carousel Item',
        fields: [
            { name: 'image', displayName: 'Image', type: manifest.fieldTypes.image },
            { name: 'title', displayName: 'Title', type: manifest.fieldTypes.singleLineText },
            { name: 'body', displayName: 'Body', type: manifest.fieldTypes.richText },
        ],
    });
};
