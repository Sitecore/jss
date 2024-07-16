import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Multilingual component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideMultilingual(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideMultilingual',
    templateName: '<%- helper.getAppPrefix(appPrefix, appName) %>StyleguideMultilingual',
    icon: SitecoreIcon.FlagGeneric,
    fields: [
      {
        name: 'sample',
        type: CommonFieldTypes.SingleLineText,
        displayName: 'This field has a translated value',
      },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: [
      '<%- helper.getAppPrefix(appPrefix, appName) %>styleguide-explanatory-component-template',
    ],
  });
}
