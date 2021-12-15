import {
  DictionaryService,
<% if (fetchWith.toUpperCase() === 'GRAPHQL') {
  -%>
    GraphQLDictionaryService
    <% } else if (fetchWith.toUpperCase() === 'REST') {
      -%>
        RestDictionaryService
        <% }
-%>
} from '@sitecore-jss/sitecore-jss-react';
import config from '../temp/config';
export class DictionaryServiceFactory {
  create() {
  <% if (fetchWith.toUpperCase() === 'GRAPHQL') {
      -%>
  return new GraphQLDictionaryService({
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
        /*
        The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
        app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
        otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
        rootItemId: '{GUID}'
        */
      });
  <% } else if (fetchWith.toUpperCase() === 'REST') {
      -%>
  return new RestDictionaryService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
  <% } -%>
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();

