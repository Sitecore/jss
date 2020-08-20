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
        type: manifest.fieldTypes.singleLineText,
        required: false,
      },
      {
        name: 'margin',
        type: manifest.fieldTypes.singleLineText,
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
        name: 'compactGutter',
        type: manifest.fieldTypes.number,
        description: 'horizontal spacing between columns on smaller screens',
        required: false,
        standardValue: 15,
      },
      {
        name: 'fullSizeGutter',
        type: manifest.fieldTypes.number,
        description: 'horizontal spacing between columns on larger screens',
        required: false,
        standardValue: 30,
      }
    ],
    placeholders: [ 'jssdocs-row' ]
  });
};
