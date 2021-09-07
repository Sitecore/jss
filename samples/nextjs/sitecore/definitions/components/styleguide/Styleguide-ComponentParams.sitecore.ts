import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-ComponentParams component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideComponentParams(manifest: Manifest): void {
  manifest.addComponent({
    name: 'JssNextWeb-Styleguide-ComponentParams',
    displayName: 'Styleguide-ComponentParams',
    icon: SitecoreIcon.WindowDialog,
    params: ['cssClass', 'columns', 'useCallToAction'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssNextWeb-styleguide-explanatory-component-template'],
  });
}
