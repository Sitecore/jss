import ConnectedSitecoreContentService from "./SitecoreContentService.connected";

/*
  This is a sample of how to customize the SitecoreContentService to use a different
  Sitecore Layout Service _named configuration_. This can alter the format of the layout
  retrieved, add or remove data, etc.

  In this case, activating this version of SitecoreContentService enables the jss-graphql
  named configuration. This configuration strips all field data from the responses, presuming
  that you will use GraphQL to acquire rendering data. This is appropriate if you plan to use
  HTTP-only GraphQL data retrieval (like ConnectedPage.js illustrates)

  This is off by default, so that we can mix and match LayoutService field data and GraphQL
  data for the sample app. To enable it, change --env.content=connected to --env.content=connected.graphql
  in package.json
*/
class ConnectedGraphQLSitecoreContentService extends ConnectedSitecoreContentService {
  getRouteData(route, language, options = {}) {
    return super.getRouteData(route, language, {
      layoutServiceConfig: {
        configurationName: "jss-graphql"
      },
      ...options
    });
  }

  getPlaceholderData(placeholderName, route, language, options = {}) {
    return super.getPlaceholderData(placeholderName, route, language, {
      layoutServiceConfig: {
        configurationName: "jss-graphql"
      },
      ...options
    });
  }
}

export default ConnectedGraphQLSitecoreContentService;
