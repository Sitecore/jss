export default manifest => {
  manifest.addComponent({
    name: "ConnectedPage",
    displayName: "Connected Page",
    fields: [
      { name: "title", type: manifest.fieldTypes.singleLineText },
      { name: "text", type: manifest.fieldTypes.richText },
      { name: "logoImage", type: manifest.fieldTypes.image }
    ]
  });
};
