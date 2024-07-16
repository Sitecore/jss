import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Text component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageText(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageText',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>StyleguideFieldUsageText',
    icon: SitecoreIcon.Text,
    fields: [
      { name: 'sample', type: CommonFieldTypes.SingleLineText },
      {
        name: 'sample2',
        displayName: 'Customize Name Shown in Sitecore',
        required: true,
        type: CommonFieldTypes.SingleLineText,
      },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
  });
}
