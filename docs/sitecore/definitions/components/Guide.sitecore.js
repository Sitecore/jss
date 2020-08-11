export default (manifest) => {
  manifest.addComponent({
    name: 'Guide',
    fields: [
      { name: 'text', type: manifest.fieldTypes.richText },
      { name: 'toc', type: manifest.fieldTypes.richText }
    ],
  });
};
