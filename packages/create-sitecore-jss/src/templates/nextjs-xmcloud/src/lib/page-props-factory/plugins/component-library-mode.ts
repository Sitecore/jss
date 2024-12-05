import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { RestComponentLibraryService } from '@sitecore-jss/sitecore-jss-nextjs';
import { DictionaryService } from '@sitecore-jss/sitecore-jss-nextjs';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import { isComponentLibraryPreviewData } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from '..';
import config from 'temp/config';

class ComponentLibraryModePlugin implements Plugin {
  private dictionaryServices: Map<string, DictionaryService>;

  order = 1;

  constructor() {
    this.dictionaryServices = new Map<string, DictionaryService>();
  }
  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;
    if (isComponentLibraryPreviewData(context.previewData)) {
      const { itemId, componentUid, site, language, renderingId, dataSourceId, version, variant } =
        context.previewData;

      const componentService = new RestComponentLibraryService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: site,
        configurationName: config.layoutServiceConfigurationName,
      });

      const dictionaryService = this.getDictionaryService(site);

      const componentData = await componentService.fetchComponentData({
        siteName: site,
        itemId,
        language,
        componentUid,
        renderingId,
        dataSourceId,
        variant,
        version,
      });

      const dictionaryData = await dictionaryService.fetchDictionaryData(language);

      if (!componentData) {
        throw new Error(
          `Unable to fetch editing data for preview ${JSON.stringify(context.previewData)}`
        );
      }

      props.locale = context.previewData.language;
      props.layoutData = componentData;
      props.headLinks = [];
      props.dictionary = dictionaryData;

      return props;
    }

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
}

export const componentLibraryModePlugin = new ComponentLibraryModePlugin();
