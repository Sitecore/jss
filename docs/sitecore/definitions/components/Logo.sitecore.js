export default (manifest) => {
  manifest.addComponent({
    name: 'Logo',
    params: [
      {
        name: 'flex',
        type: manifest.fieldTypes.singleLineText,
        description: 'horizontal fill',
        required: false,
        standardValue: 'auto',
      }
    ]
  });
};
