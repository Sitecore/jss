import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-SitecoreContext component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideSitecoreContext(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideSitecoreContext',
    templateName: 'JssAngularWeb-StyleguideSitecoreContext',
    icon: SitecoreIcon.ControlPanel,
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
