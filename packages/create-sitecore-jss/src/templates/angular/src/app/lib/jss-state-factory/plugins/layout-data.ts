import { JssState } from '../../../JssState';
import { Plugin } from '..';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-angular';

class LayoutDataPlugin implements Plugin {
  order = 0;

  exec(jssState: JssState, layoutData: LayoutServiceData) {
    jssState.sitecore = layoutData.sitecore ? layoutData.sitecore : null;

    return jssState;
  }
}

export const layoutDataPlugin = new LayoutDataPlugin();
