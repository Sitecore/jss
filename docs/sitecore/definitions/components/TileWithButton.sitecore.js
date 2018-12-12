export default (manifest) => {
  manifest.addComponent({
    name: 'TileWithButton',
    fields: [
      {
        name: 'title',
        type: manifest.fieldTypes.singleLineText,
      },
      { name: 'text', displayName: 'Text', type: manifest.fieldTypes.richText },
      {
        name: 'linkUrl',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'linkText',
        type: manifest.fieldTypes.singleLineText,
      },
    ],
  });
};
