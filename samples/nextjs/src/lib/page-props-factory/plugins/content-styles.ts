import { SitecorePageProps } from 'lib/page-props';
import { getContentStylesheetLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import { sitecoreConfig } from '@sitecore-jss/sitecore-jss-nextjs';

class ContentStylesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Get content stylessheet link, empty if styles are not used on the page
    const contentStyles = getContentStylesheetLink(
      props.layoutData,
      sitecoreConfig.client.xmcloud!.sitecoreEdgeContextId || '123',
      sitecoreConfig.client.xmcloud!.sitecoreEdgeUrl
    );

    if (contentStyles) props.headLinks.push(contentStyles);

    return props;
  }
}

export const contentStylesPlugin = new ContentStylesPlugin();
