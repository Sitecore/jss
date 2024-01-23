import { SitecorePageProps } from 'lib/page-props';
import { getComponentLibraryStylesheetLinks } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import config from 'temp/config';

class ComponentThemesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Collect FEAAS, BYOC, SXA component themes
    props.headLinks.push(
      ...getComponentLibraryStylesheetLinks(
        props.layoutData,
        config.sitecoreEdgeContextId,
        config.sitecoreEdgeUrl
      )
    );
    return props;
  }
}

export const componentThemesPlugin = new ComponentThemesPlugin();
