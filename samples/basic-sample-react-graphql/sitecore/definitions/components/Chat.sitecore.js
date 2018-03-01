export default manifest => {
  manifest.addComponent({
    name: "Chat",
    displayName: "Chat",
    fields: [{ name: "title", type: manifest.fieldTypes.singleLineText }]
  });
};
