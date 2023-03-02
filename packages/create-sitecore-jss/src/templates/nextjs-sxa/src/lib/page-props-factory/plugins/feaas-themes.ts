import { SitecorePageProps } from 'lib/page-props';
import { getFEAASLibraryStylesheetURLs } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';

class FEeaSThemesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Collect FEAAS themes
    props.headLinks = getFEAASLibraryStylesheetURLs(props.layoutData);

    return props;
  }
}

export const feaasThemesPlugin = new FEeaSThemesPlugin();
