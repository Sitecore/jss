import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the GraphQL-ConnectedDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function GraphQLConnectedDemo(manifest: Manifest) {
  manifest.addComponent({
    name: 'GraphQLConnectedDemo',
    templateName: 'JssAngularWeb-GraphQLConnectedDemo',
    icon: SitecoreIcon.GraphConnection_directed,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.SingleLineText },
      { name: 'sample2', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
