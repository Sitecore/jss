const initialState = () => ({
  sitecore: {
    context: {
      pageEditing: false,
      language: "en"
    },
    route: {
      placeholders: {}
    }
  },
  viewBag: {}
});

// allows consumers to mutate the object without interfering with other imports
export default initialState;
