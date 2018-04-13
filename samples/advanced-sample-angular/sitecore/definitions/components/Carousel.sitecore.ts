import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'Carousel',
        displayName: 'Carousel',
        fields: [
            { name: 'items', displayName: 'Items', type: CommonFieldTypes.ContentList },
        ],
    });

    manifest.addComponent({
        name: 'Carousel-items-Item',
        displayName: 'Carousel Item',
        fields: [
            { name: 'image', displayName: 'Image', type: CommonFieldTypes.Image },
            { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
            { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
        ],
    });
};
