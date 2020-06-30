export default (manifest) => {
  manifest.addComponent({
    name: 'MainNav',
    fields: [
      {
        name: 'selectedMenuItem',
        displayName: 'Selected Menu Item',
        type: manifest.fieldTypes.singleLineText,
      }
    ],
    params: [
      {
        name: 'flex',
        type: manifest.fieldTypes.singleLineText,
        description: 'horizontal fill',
        required: false,
        standardValue: 'auto',
      }
    ]
  })
};
