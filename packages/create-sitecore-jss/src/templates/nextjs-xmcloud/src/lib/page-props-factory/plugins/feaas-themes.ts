import { SitecorePageProps } from 'lib/page-props';
import { getFEAASLibraryStylesheetLinks } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import config from 'temp/config';

class FEeaSThemesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Collect FEAAS themes
    props.headLinks.push(
      ...getFEAASLibraryStylesheetLinks(
        props.layoutData,
        config.sitecoreEdgeContextId,
        config.sitecoreEdgeUrl
      )
    );
    return props;
  }
}

export const feaasThemesPlugin = new FEeaSThemesPlugin();
