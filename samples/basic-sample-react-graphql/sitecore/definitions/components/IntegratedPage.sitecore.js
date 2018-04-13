import { addComponent, CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';
import query from './IntegratedPage.sitecore.graphql';

export default (manifest) => {
  addComponent(manifest, {
    name: 'IntegratedPage',
    displayName: 'Integrated Page',
    icon: SitecoreIcon.GraphConnection_directed,
    graphQLQuery: query,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.RichText },
      { name: 'logoImage', type: CommonFieldTypes.Image },
    ],
  });
};
