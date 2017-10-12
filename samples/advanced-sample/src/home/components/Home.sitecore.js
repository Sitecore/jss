export default (manifest) => {
  manifest.addComponent({
    name: 'Home',
    displayName: 'Home',
    placeholders: [
      { name: 'page-header' },
      { name: 'page-content' },
    ],
  });
};
