import query from "./IntegratedPage.sitecore.graphql";

export default manifest => {
  manifest.addComponent({
    name: "IntegratedPage",
    displayName: "Integrated Page",
    graphQLQuery: query,
    fields: [
      { name: "title", type: manifest.fieldTypes.singleLineText },
      { name: "text", type: manifest.fieldTypes.richText },
      { name: "logoImage", type: manifest.fieldTypes.image }
    ]
  });
};
