import { addComponent, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';
import fs from 'fs';

const WizardQuery = fs.readFileSync(
  'sitecore/definitions/components/Wizard.sitecore.graphql',
  'utf8'
);

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
