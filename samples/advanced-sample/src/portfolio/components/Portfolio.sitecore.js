export default (manifest) => {
  manifest.addComponent({
    name: 'Portfolio',
    displayName: 'Portfolio',
    placeholders: [
      { name: 'page-header' },
      { name: 'page-content' },
    ],
  });
};
