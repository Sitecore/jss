// eslint-disable-next-line no-unused-vars
import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Company-Layout-Reuse component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'Company-Layout-Reuse',
    templateName: 'JssVueWeb-Company-Layout-Reuse',
    icon: SitecoreIcon.DocumentsExchange,
    placeholders: ['jss-reuse-example'],
    // inherit fields from another template (../templates/Company-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssVueWeb-company-explanatory-component-template'],
  });
}
