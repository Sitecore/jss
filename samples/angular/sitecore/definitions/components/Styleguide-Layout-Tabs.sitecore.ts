import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Layout-Tabs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideLayoutTabs(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideLayoutTabs',
    templateName: 'JssAngularWeb-StyleguideLayoutTabs',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['jss-tabs'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
