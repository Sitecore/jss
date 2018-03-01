export default manifest => {
  manifest.addComponent({
    name: "ServiceList",
    displayName: "Service List",
    fields: [
      {
        name: "items",
        displayName: "Items",
        type: manifest.fieldTypes.contentList
      }
    ]
  });

  manifest.addComponent({
    name: "ServiceList-items-Item", // manifest generator hard-coded format is 'TemplateName-FieldName-Item'
    displayName: "Service List Item",
    inherits: ["TitleDescription"] // template field inheritance by name
  });
};
