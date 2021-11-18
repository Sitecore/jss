import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-SitecoreContext component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideSitecoreContext(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-SitecoreContext',
    templateName: '<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>Styleguide-SitecoreContext',
    icon: SitecoreIcon.ControlPanel,
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['<%- appPrefix ? `${helper.getPascalCaseName(appName)}-` : "" %>styleguide-explanatory-component-template'],
  });
}
