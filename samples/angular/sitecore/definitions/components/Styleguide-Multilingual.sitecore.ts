import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Multilingual component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideMultilingual(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideMultilingual',
    templateName: 'JssAngularWeb-StyleguideMultilingual',
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
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
