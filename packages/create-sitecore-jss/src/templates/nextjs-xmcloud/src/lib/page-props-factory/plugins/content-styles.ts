import { SitecorePageProps } from 'lib/page-props';
import { getContentStylesheetLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import config from 'temp/config';

class ContentStylesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Get content stylessheet link, empty if styles are not used on the page
    const contentStyles = getContentStylesheetLink(
      props.layoutData,
      config.sitecoreEdgeContextId,
      config.sitecoreEdgeUrl
    );

    contentStyles && props.headLinks.push(contentStyles);

    return props;
  }
}

export const contentStylesPlugin = new ContentStylesPlugin();
