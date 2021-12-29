// eslint-disable-next-line no-unused-vars
import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Layout-Reuse component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'Styleguide-Layout-Reuse',
    templateName: 'Nuxtjs-Styleguide-Layout-Reuse',
    icon: SitecoreIcon.DocumentsExchange,
    placeholders: ['Nuxtjs-jss-reuse-example'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['Nuxtjs-styleguide-explanatory-component-template'],
  });
}
