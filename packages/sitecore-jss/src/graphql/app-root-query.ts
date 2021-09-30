import { GraphQLClient } from './graphql-request-client';
import { SitecoreTemplateId } from '../utils/constants';
import debug from '../utils/debug';

/** @private */
export const siteNameError = 'The site name must be a non-empty string';
/** @private */
export const languageError = 'The language must be a non-empty string';

/*
 * GraphQL query that returns the ID of the root item of the specified site and language
 */
const appRootQuery = /* GraphQL */ `
  query AppRootQuery($jssAppTemplateId: String!, $siteName: String!, $language: String!) {
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
 * The schema of data returned in response to an app root query request
 */
export type AppRootQueryResult = {
  layout: {
    homePage: {
      rootItem: {
        id: string;
      }[];
    };
  };
};

/**
 * Gets the ID of the JSS App root item for the specified site and language.
 * @param {GraphQLClient} client that fetches data from a GraphQL endpoint.
 * @param {string} siteName the name of the Sitecore site.
 * @param {string} language the item language version.
 * @param {string} jssAppTemplateId optional template ID of the app root item. If not
 * specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App"
 * item is used.
 * @returns the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.
 * @throws {RangeError} if a valid site name value is not provided.
 * @throws {RangeError} if a valid language value is not provided.
 * This function intentionally avoids throwing an error if a root item is not found,
 * leaving that decision up to implementations.
 */
export async function getAppRootId(
  client: GraphQLClient,
  siteName: string,
  language: string,
  jssAppTemplateId?: string
): Promise<string | null> {
  if (!siteName) {
    throw new RangeError(siteNameError);
  }

  if (!language) {
    throw new RangeError(languageError);
  }

  debug.dictionary('fetching site root for %s %s', language, siteName);

  const fetchResponse = await client.request<AppRootQueryResult>(appRootQuery, {
    jssAppTemplateId: jssAppTemplateId || SitecoreTemplateId.JssApp,
    siteName,
    language,
  });

  if (!fetchResponse?.layout?.homePage?.rootItem?.length) {
    return null;
  }

  return fetchResponse.layout.homePage.rootItem[0].id;
}
