import type { LayoutServiceData } from "@sitecore-jss/sitecore-jss/layout";
import type { DictionaryPhrases } from "@sitecore-jss/sitecore-jss/i18n";
import type { SiteInfo } from '@sitecore-jss/sitecore-jss/site';
import jss from '@sitecore-jss/sitecore-jss';
import * as plugins from "@temp/page-props-factory-plugins";

export type PagePropsFactoryConfig = {
  path: string;
  language: string;
  locales: string[];
} & App.Locals;


/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  notFound: boolean;
  layoutData: LayoutServiceData;
  headLinks: jss.HTMLLink[];
};

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation
   */
  exec(
    props: SitecorePageProps,
    config: PagePropsFactoryConfig
  ): Promise<SitecorePageProps>;
}

export class SitecorePagePropsFactory {
  /**
   * @param {PagePropsFactoryConfig} config
   * @see SitecorePageProps
   */
  public async create(
    config: PagePropsFactoryConfig
  ): Promise<SitecorePageProps> {
    const startTimestamp = Date.now();
    jss.debug.common("page-props-factory start");

    const extendedProps = await (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce(async (result, plugin) => {
        const props = await result;
        const newProps = await plugin.exec(props, config);
        return newProps;
      }, Promise.resolve({} as SitecorePageProps));

    jss.debug.common(
      "page-props-factory end in %dms",
      Date.now() - startTimestamp
    );

    return extendedProps;
  }
}

export const sitecorePagePropsFactory = new SitecorePagePropsFactory();
