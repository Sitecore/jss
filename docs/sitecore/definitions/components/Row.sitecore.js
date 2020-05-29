export default (manifest) => {
  manifest.addComponent({
    name: 'Row',
    fields: [],
    params: [
      {
        name: 'backgroundColor',
        type: manifest.fieldTypes.singleLineText,
        required: false,
        standardValue: 'none'
      },
      {
        name: 'justify',
        type: manifest.fieldTypes.singleLineText,
        required: false,
        standardValue: 'start',
        validationPattern: '^start|end|center|space-around|space-between$',
        validationMessage: 'Invalid value in "justify" field. Acceptable values are: start, end, center, space-around, space-between.'
      },
      {
        name: 'padding',
        type: manifest.fieldTypes.number,
        required: false,
      },
      {
        name: 'margin',
        type: manifest.fieldTypes.number,
        required: false,
      },
    ],
    placeholders: [ 'jssdocs-row' ]
  });
};
