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
        name: 'padding',
        type: manifest.fieldTypes.number,
        required: false,
      },
      {
        name: 'margin',
        type: manifest.fieldTypes.number,
        required: false,
      },
      // This is a flex container, so all flex properties apply
      {
        name: 'justify',
        type: manifest.fieldTypes.singleLineText,
        description: 'horizontal arrangement',
        required: false,
        standardValue: 'start',
        validationPattern: '^start|end|center|space-around|space-between$',
        validationMessage: 'Invalid value in "justify" field. Acceptable values are: start, end, center, space-around, space-between.'
      },
      {
        name: 'align',
        type: manifest.fieldTypes.singleLineText,
        description: 'vertical alignment',
        required: false,
        standardValue: 'top',
        validationPattern: '^top|middle|bottom$',
        validationMessage: 'Invalid value in "justify" field. Acceptable values are: top, middle, bottom.'
      },
      {
        name: 'gutter',
        type: manifest.fieldTypes.number,
        description: 'spacing between columns',
        required: false,
        standardValue: 15,
      }
    ],
    placeholders: [ 'jssdocs-row' ]
  });
};
