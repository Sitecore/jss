export default (manifest) => {
  manifest.addComponent({
    name: 'Article',
    displayName: 'Article',
    fields: [{ name: 'text', type: manifest.fieldTypes.richText }],
  });
};
