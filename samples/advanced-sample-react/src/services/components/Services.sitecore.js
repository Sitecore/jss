export default (manifest) => {
  manifest.addComponent({
    name: 'Services',
    displayName: 'Services',
    placeholders: [
      { name: 'page-header' },
      { name: 'page-content' },
    ],
  });
};
