import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the GraphQL-Layout component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function GraphQLLayout(manifest: Manifest) {
  manifest.addComponent({
    name: 'GraphQLLayout',
    templateName: 'JssAngularWeb-GraphQLLayout',
    icon: SitecoreIcon.Layout,
    placeholders: ['JssAngularWeb-graphql-layout'],
  });
}
