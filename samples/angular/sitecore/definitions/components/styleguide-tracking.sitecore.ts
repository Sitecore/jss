import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Tracking component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 */
export default function StyleguideTracking(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideTracking',
    templateName: 'JssAngularWeb-StyleguideTracking',
    icon: SitecoreIcon.Compass,
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
