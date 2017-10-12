export default (manifest) => {
  manifest.addComponent({
    name: 'About',
    displayName: 'About',
    placeholders: [
      { name: 'page-header' },
      { name: 'page-content' },
    ],
  });
};
