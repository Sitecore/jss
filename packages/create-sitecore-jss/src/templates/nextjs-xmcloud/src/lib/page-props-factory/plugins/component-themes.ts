import { SitecorePageProps } from 'lib/page-props';
import { getDesignLibraryStylesheetLinks } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import config from 'temp/config';

class ComponentThemesPlugin implements Plugin {
  order = 10;

  async exec(props: SitecorePageProps) {
    // Collect FEAAS, BYOC, SXA component themes
    props.headLinks.push(
      ...getDesignLibraryStylesheetLinks(
        props.layoutData,
        config.sitecoreEdgeContextId,
        config.sitecoreEdgeUrl
      )
    );
    return props;
  }
}

export const componentThemesPlugin = new ComponentThemesPlugin();
