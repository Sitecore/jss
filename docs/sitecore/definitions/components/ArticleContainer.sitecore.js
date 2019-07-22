export default (manifest) => {
  manifest.addComponent({
    name: 'ArticleContainer',
    fields: [
      {
        name: 'sidenav',
        type: manifest.fieldTypes.singleLineText,
      },
      {
        name: 'useSearch',
        type: manifest.fieldTypes.singleLineText,
      },
    ],
  });
};
