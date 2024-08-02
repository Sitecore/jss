import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-angular';
import { JssState } from './../../JssState';
import * as plugins from './../../../app/temp/jss-state-factory-plugins';

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation
   */
  exec(jssState: JssState, layoutData: LayoutServiceData): JssState;
}

export class SitecoreJssStateFactory {
  /**
   * Create JssState for given layout service data
   * @param {LayoutServiceData} layoutData the layout service data
   */
  public create(layoutData: LayoutServiceData): JssState {
    const finalJssState = (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce((result, plugin) => {
        return plugin.exec(result, layoutData);
      }, new JssState());

    return finalJssState;
  }
}

export const sitecoreJssStateFactory = new SitecoreJssStateFactory();
