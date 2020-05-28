export default (manifest) => {
  manifest.addComponent({
    name: 'SideNav',
    fields: [
      {
        name: 'navType',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'useSearch',
        type: manifest.fieldTypes.singleLineText,
      },
    ],
  });
};
