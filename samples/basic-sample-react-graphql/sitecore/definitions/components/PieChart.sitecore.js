import { addComponent, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';
import query from './PieChart.sitecore.graphql';

export default (manifest) => {
  addComponent(manifest, {
    name: 'PieChart',
    displayName: 'Pie Chart',
    icon: SitecoreIcon.ChartPie,
    // enables authors to add items of the 'ChartData' template under this component's datasources
    // this is an advanced feature for Sitecore developers, and is optional.
    insertOptions: ['ChartData'],
    // enables a Sitecore Custom Experience Button to improve a content author's editing experience
    // for this item. This is an advanced feature for Sitecore developers, and is optional.
    // The CEB value can be one of:
    // - a relative item path from coredb:/sitecore/content/Applications/WebEdit/Custom Experience Buttons
    // - an item GUID
    customExperienceButtons: ['Insert'],
    graphQLQuery: query,
    fields: [
      {
        name: 'title',
        displayName: 'Chart Title',
        type: CommonFieldTypes.SingleLineText,
        standardValue: '$name',
      },
      {
        name: 'description',
        displayName: 'Description',
        type: CommonFieldTypes.RichText,
      },
      {
        name: 'scale',
        displayName: 'Chart scale in pixels (square)',
        type: CommonFieldTypes.Number,
        standardValue: 300,
      },
    ],
  });
};
