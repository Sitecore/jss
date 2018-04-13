import { addComponent, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Wizard',
    placeholders: [{ name: 'steps' }],
    icon: SitecoreIcon.Step,
  });

  addComponent(manifest, {
    name: 'StepReference',
    fields: [
      { name: 'stepName', type: CommonFieldTypes.SingleLineText },
      { name: 'stepLink', type: CommonFieldTypes.GeneralLink },
    ],
  });

  addComponent(manifest, {
    name: 'RichText',
    fields: [{ name: 'text', type: CommonFieldTypes.RichText }],
  });

  addComponent(manifest, {
    name: 'Heading',
    fields: [{ name: 'text', type: CommonFieldTypes.SingleLineText }],
  });

  addComponent(manifest, {
    name: 'Question',
    fields: [
      { name: 'label', type: CommonFieldTypes.SingleLineText },
      { name: 'inputName', type: CommonFieldTypes.SingleLineText },
    ],
  });

  addComponent(manifest, {
    name: 'FormValues',
  });
};
