import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Layout-Reuse component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideLayoutReuse(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideLayoutReuse',
    templateName: 'JssAngularWeb-StyleguideLayoutReuse',
    icon: SitecoreIcon.DocumentsExchange,
    placeholders: ['jss-reuse-example'],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
