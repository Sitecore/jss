export default (manifest) => {
  manifest.addComponent({
    name: 'FeatureJumboShort',
    fields: [
      {
        name: 'csscolorclass',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'title',
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
      {
        name: 'imageclass',
        type: manifest.fieldTypes.singleLineText,
      },
    ],
  });
};
