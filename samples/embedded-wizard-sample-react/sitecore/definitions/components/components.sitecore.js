import { addComponent, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';
import WizardQuery from './Wizard.sitecore.graphql';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Wizard',
    icon: SitecoreIcon.Step,
    graphQLQuery: WizardQuery,
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
