import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Layout-Tabs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideLayoutTabs(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-Layout-Tabs',
    templateName: 'JssNextWeb-Styleguide-Layout-Tabs',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['JssNextWeb-jss-tabs'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssNextWeb-styleguide-explanatory-component-template'],
  });
}
