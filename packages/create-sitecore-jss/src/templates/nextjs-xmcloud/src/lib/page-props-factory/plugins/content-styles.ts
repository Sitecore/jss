import { SitecorePageProps } from 'lib/page-props';
import { getContentStylesheetLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import config from 'temp/config';

class ContentStylesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Collect content styles
    props.headLinks.push(getContentStylesheetLink(config.sitecoreEdgeUrl));

    return props;
  }
}

export const contentStylesPlugin = new ContentStylesPlugin();
