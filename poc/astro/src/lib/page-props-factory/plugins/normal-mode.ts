import type {
  LayoutService,
} from "@sitecore-jss/sitecore-jss/layout";
import type { DictionaryService } from '@sitecore-jss/sitecore-jss/i18n';
import { dictionaryServiceFactory } from "@lib/dictionary-service-factory";
import { layoutServiceFactory } from "@lib/layout-service-factory";
import type { Plugin, SitecorePageProps } from "..";
import type { PagePropsFactoryConfig } from '..';

class NormalModePlugin implements Plugin {
  private dictionaryServices: Map<string, DictionaryService>;
  private layoutServices: Map<string, LayoutService>;

  order = 1;

  constructor() {
    this.dictionaryServices = new Map<string, DictionaryService>();
    this.layoutServices = new Map<string, LayoutService>();
  }

  async exec(props: SitecorePageProps, config: PagePropsFactoryConfig) {
    props.layoutData = await this.getLayoutService(
      props.site.name
    ).fetchLayoutData(config.path, config.language);

    props.dictionary = await this.getDictionaryService(
      props.site.name
    ).fetchDictionaryData(config.language);

    return props;
  }

  private getDictionaryService(siteName: string): DictionaryService {
    if (this.dictionaryServices.has(siteName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.dictionaryServices.get(siteName)!;
    }

    const dictionaryService = dictionaryServiceFactory.create(siteName);
    this.dictionaryServices.set(siteName, dictionaryService);

    return dictionaryService;
  }

  private getLayoutService(siteName: string): LayoutService {
    if (this.layoutServices.has(siteName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.layoutServices.get(siteName)!;
    }

    const layoutService = layoutServiceFactory.create(siteName);
    this.layoutServices.set(siteName, layoutService);

    return layoutService;
  }
}

export const normalModePlugin = new NormalModePlugin();
