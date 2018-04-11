const initialState = () => ({
  sitecore: {
    context: {
      pageEditing: false,
      item: {
        language: 'en',
      },
    },
    rendering: {},
    dataSource: null,
    placeholders: {},
  },
  viewBag: {},
});

export default initialState;
