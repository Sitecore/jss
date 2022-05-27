import { addComponent, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-dev-tools';

export default (manifest) => {
  addComponent(manifest, {
    name: 'Home',
    templateName: "<%- helper.getAppPrefix(appPrefix, appName) %>Home",
    displayName: 'Home',
    fields: [
      { name: 'styleguideLink', type: CommonFieldTypes.SingleLineText },
      { name: 'styleguideLinkTitle', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.RichText },
    ],
  });
};
