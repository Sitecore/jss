import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Layout-Tabs-Tab component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideLayoutTabsTab(manifest: Manifest): void {
  manifest.addComponent({
    name: 'JssNextWeb-Styleguide-Layout-Tabs-Tab',
    displayName: 'Styleguide-Layout-Tabs-Tab',
    icon: SitecoreIcon.TabPane,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'content', type: CommonFieldTypes.RichText },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
