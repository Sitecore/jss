import { addTemplate, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  // data template used by PieChart UI component
  addTemplate(manifest, {
    name: 'ChartData',
    displayName: 'Chart Data',
    icon: SitecoreIcon.ChartDonut,
    fields: [
      {
        name: 'label',
        type: CommonFieldTypes.SingleLineText,
        required: true,
        standardValue: '$name',
      },
      {
        name: 'value',
        type: CommonFieldTypes.Number,
        standardValue: 10,
      },
    ],
  });
};
