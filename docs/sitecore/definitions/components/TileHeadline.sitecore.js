export default (manifest) => {
  manifest.addComponent({
    name: 'TileHeadline',
    fields: [
      {
        name: 'title',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'subtitle',
        type: manifest.fieldTypes.singleLineText,
      },
    ],
  });
};
