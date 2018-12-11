export default (manifest) => {
  manifest.addComponent({
    name: 'Hero',
    fields: [
      {
        name: 'title',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'subtitle',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'text',
        displayName: 'Text',
        type: manifest.fieldTypes.richText,
      },
      {
        name: 'image',
        displayName: 'Image',
        type: manifest.fieldTypes.image,
      },
    ],
  });
};
