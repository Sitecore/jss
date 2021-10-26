import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Styleguide-Layout-Tabs-Tab component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideLayoutTabsTab(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideLayoutTabsTab',
    templateName: 'JssAngularWeb-StyleguideLayoutTabsTab',
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
