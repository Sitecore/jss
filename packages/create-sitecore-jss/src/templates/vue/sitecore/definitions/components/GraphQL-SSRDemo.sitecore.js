// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the GraphQL-SSRDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'GraphQL-SSRDemo',
    templateName: ' <%- helper.getAppPrefix(appPrefix, appName) %>Web-GraphQL-SSRDemo',
    icon: SitecoreIcon.GraphConnection_directed,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.SingleLineText },
      { name: 'sample2', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
