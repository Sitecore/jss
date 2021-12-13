import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Date component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideFieldUsageDate(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-Date',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>Styleguide-FieldUsage-Date',
    icon: SitecoreIcon.Clock,
    fields: [
      { name: 'date', type: CommonFieldTypes.Date },
      { name: 'dateTime', type: CommonFieldTypes.DateTime },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
  });
}
