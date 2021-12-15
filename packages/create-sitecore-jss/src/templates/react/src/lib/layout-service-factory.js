import {
  LayoutService,
<% if (fetchWith.toUpperCase() === 'GRAPHQL') {
  -%>
    GraphQLLayoutService
    <% } else if (fetchWith.toUpperCase() === 'REST') {
      -%>
        RestLayoutService
        <% }
-%>
} from '@sitecore-jss/sitecore-jss-react';
import config from '../temp/config';

export class LayoutServiceFactory {
  create() {
    <% if (fetchWith.toUpperCase() === 'GRAPHQL') {
      -%>
    return new GraphQLLayoutService({
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
    <% } else if (fetchWith.toUpperCase() === 'REST') {
      -%>
    return new RestLayoutService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
        configurationName: 'default',
      });
    <% } -%>
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
