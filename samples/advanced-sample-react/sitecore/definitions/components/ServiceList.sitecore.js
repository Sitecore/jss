import { addComponent, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'ServiceList',
    displayName: 'Service List',
    fields: [
      {
        name: 'items',
        displayName: 'Items',
        type: CommonFieldTypes.ContentList,
      },
    ],
  });

  addComponent(manifest, {
    name: 'ServiceList-items-Item', // manifest generator hard-coded format is 'TemplateName-FieldName-Item'
    displayName: 'Service List Item',
    // template field inheritance by name
    // note: inheritance by ID also works, if a template has an ID set
    inherits: ['TitleDescription'],
  });
};
