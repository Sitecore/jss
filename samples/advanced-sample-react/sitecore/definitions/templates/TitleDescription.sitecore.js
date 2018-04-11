import { addTemplate, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addTemplate(manifest, {
    name: 'TitleDescription',
    // ID: (optional) a string (unique app-wide) or GUID that sets the ID when imported into Sitecore
    // the id is generated based on the `name` if it is unspecified. Useful for template inheritance,
    // though names also work there
    id: 'title-description-template',
    icon: SitecoreIcon.Alarmclock,
    defaultWorkflow: '/sitecore/system/Workflows/Sample Workflow',
    fields: [
      {
        name: 'title',
        // (optional) a string (unique app-wide) or GUID that sets the ID when imported into Sitecore
        // the id is generated based on the `name` if it is unspecified. Useful for template inheritance,
        // though names also work there
        id: 'title-description-template-title',
        displayName: 'Title',
        type: CommonFieldTypes.SingleLineText,
        sortOrder: 1000,
        standardValue: '$name',
        section: 'Title Description',
        required: true,
        validationPattern: '^[A-Za-z ]+$',
        validationMessage: 'Use only letters and spaces in the title.',
      },
      {
        name: 'description',
        displayName: 'Description',
        type: CommonFieldTypes.RichText,
        sortOrder: 2000,
        section: 'Title Description',
      },
      {
        name: 'shared',
        // custom field types can be specified as strings
        type: 'Name Value List',
        storage: 'shared', // shared, unversioned, versioned (versioned is default); do not change after imported
        source: '/sitecore/content',
      },
    ],
  });
};
