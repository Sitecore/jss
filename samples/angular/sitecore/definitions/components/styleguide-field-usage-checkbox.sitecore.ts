import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-FieldUsage-Checkbox component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageCheckbox(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageCheckbox',
    templateName: 'JssAngularWeb-StyleguideFieldUsageCheckbox',
    icon: SitecoreIcon.CheckboxSelected,
    fields: [
      { name: 'checkbox', type: CommonFieldTypes.Checkbox },
      { name: 'checkbox2', type: CommonFieldTypes.Checkbox },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
