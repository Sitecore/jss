import { readFileSync } from 'fs';
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

const query = readFileSync(
  'sitecore/definitions/components/graph-ql-integrated-demo.sitecore.graphql',
  'utf8'
);

/**
 * Adds the GraphQL-IntegratedDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function GraphQLIntegratedDemo(manifest: Manifest) {
  manifest.addComponent({
    name: 'GraphQLIntegratedDemo',
    templateName: 'JssAngularWeb-GraphQLIntegratedDemo',
    icon: SitecoreIcon.GraphConnection_directed,
    graphQLQuery: query,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.SingleLineText },
      { name: 'sample2', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
