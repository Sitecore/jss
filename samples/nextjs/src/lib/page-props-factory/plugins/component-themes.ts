import { SitecorePageProps } from 'lib/page-props';
import { getComponentLibraryStylesheetLinks } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import { sitecoreConfig } from '@sitecore-jss/sitecore-jss-nextjs';

class ComponentThemesPlugin implements Plugin {
  // Make sure to run this plugin after the personalization plugin, since it relies on the layout data
  order = 10;

  async exec(props: SitecorePageProps) {
    // Collect FEAAS, BYOC, SXA component themes
    props.headLinks.push(
      ...getComponentLibraryStylesheetLinks(
        props.layoutData,
        sitecoreConfig.client.xmcloud!.sitecoreEdgeContextId || '123',
        sitecoreConfig.client.xmcloud!.sitecoreEdgeUrl
      )
    );
    return props;
  }
}

export const componentThemesPlugin = new ComponentThemesPlugin();
