import { GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';

const appRootQuery = /* GraphQL */ `
  query getSiteRoot($jssAppTemplateId: String!, $siteName: String!, $language: String!) {
    layout(site: $siteName, routePath: "/", language: $language) {
      homePage: item {
        rootItem: ancestors(includeTemplateIDs: [$jssAppTemplateId]) {
          id
        }
      }
    }
  }
`;

/**
 * A reply from the GraphQL API to the app root query
 */
type AppRootQueryResult = {
  layout: {
    homePage: {
      rootItem: {
        id: string;
      }[];
    };
  };
};

/**
 * Gets the ID of the JSS App root item from the Sitecore item tree.
 * @param {GraphQLRequestClient} client that fetches data from a GraphQL endpoint.
 * @param {string} siteName the name of the Sitecore site.
 * @param {string} language the item language version.
 * @returns the root item ID of the JSS App in Sitecore.
 * @throws Error if the app root was not found for the specified site and language.
 */
export async function getAppRootId(
  client: GraphQLRequestClient,
  siteName: string,
  language: string
): Promise<string> {
  const fetchResponse = await client.request<AppRootQueryResult>(appRootQuery, {
    jssAppTemplateId: SitecoreTemplateId.JssApp,
    siteName,
    language,
  });

  if (!fetchResponse?.layout?.homePage?.rootItem?.length) {
    throw new Error('Error fetching Sitecore site root item');
  }

  return fetchResponse.layout.homePage.rootItem[0].id;
}
