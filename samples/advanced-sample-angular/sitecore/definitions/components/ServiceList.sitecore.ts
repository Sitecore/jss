import { Manifest, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest: Manifest) => {
    manifest.addComponent({
        name: 'ServiceList',
        displayName: 'Service List',
        fields: [
            { name: 'items', displayName: 'Items', type: CommonFieldTypes.ContentList },
        ],
    });

    manifest.addComponent({
        name: 'ServiceList-items-Item', // manifest generator hard-coded format is 'TemplateName-FieldName-Item'
        displayName: 'Service List Item',
        fields: [
            { name: 'title', displayName: 'Title', type: CommonFieldTypes.SingleLineText },
            { name: 'description', displayName: 'Description', type: CommonFieldTypes.RichText },
        ],
    });
};
