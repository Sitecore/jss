import { JssState } from '../../../JssState';
import { Plugin } from '..';
import { LayoutServiceData, getContentStylesheetLink } from '@sitecore-jss/sitecore-jss-angular';

class HeadLinksPlugin implements Plugin {
  order = 2;

  exec(jssState: JssState, layoutData: LayoutServiceData) {
    // TODO: get contextId and edgeUrl properly
    const sitecoreEdgeContextId = '';
    const sitecoreEdgeUrl = '';
    const contentStyles = getContentStylesheetLink(
      layoutData,
      sitecoreEdgeContextId,
      sitecoreEdgeUrl
    );
    contentStyles && jssState.headLinks.push(contentStyles);

    return jssState;
  }
}

export const headLinksPlugin = new HeadLinksPlugin();
