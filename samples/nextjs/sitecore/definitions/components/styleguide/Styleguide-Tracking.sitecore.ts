import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Tracking component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideTracking(manifest: Manifest): void {
  manifest.addComponent({
    name: 'JssNextWeb-Styleguide-Tracking',
    displayName: 'Styleguide-Tracking',
    icon: SitecoreIcon.Compass,
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['jssnextweb-styleguide-explanatory-component-template'],
  });
}
