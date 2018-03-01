export default (manifest) => {
  manifest.addComponent({
    name: 'Wizard',
    placeholders: [
      { name: 'steps' },
    ],
  });

  manifest.addComponent({
    name: 'StepReference',
    fields: [
      { name: 'stepName', type: manifest.fieldTypes.singleLineText },
      { name: 'stepLink', type: manifest.fieldTypes.generalLink },
    ],
  });

  manifest.addComponent({
    name: 'RichText',
    fields: [
      { name: 'text', type: manifest.fieldTypes.richText },
    ],
  });

  manifest.addComponent({
    name: 'Heading',
    fields: [
      { name: 'text', type: manifest.fieldTypes.singleLineText },
    ],
  });

  manifest.addComponent({
    name: 'Question',
    fields: [
      { name: 'label', type: manifest.fieldTypes.singleLineText },
      { name: 'inputName', type: manifest.fieldTypes.singleLineText },
    ],
  });

  manifest.addComponent({
    name: 'FormValues',
  });
};
