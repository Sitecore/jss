export default (manifest) => {
  manifest.addComponent({
    name: 'Welcome',
    displayName: 'Welcome',
    fields: [
      { name: 'title', type: manifest.fieldTypes.singleLineText },
      { name: 'text', type: manifest.fieldTypes.richText },
      { name: 'logoImage', type: manifest.fieldTypes.image },
    ],
  });
};
