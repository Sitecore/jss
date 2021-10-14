import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Layout component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideLayout(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-Layout',
    templateName: 'JssNextWeb-Styleguide-Layout',
    icon: SitecoreIcon.Layout,
    placeholders: ['JssNextWeb-jss-styleguide-layout'],
  });
}
