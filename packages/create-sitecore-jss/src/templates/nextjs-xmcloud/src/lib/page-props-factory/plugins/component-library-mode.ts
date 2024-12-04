import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { RestComponentLibraryService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { isComponentLibraryPreviewData } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from '..';

class ComponentLibraryModePlugin implements Plugin {
  order = 1;

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

      if (!componentData) {
        throw new Error(
          `Unable to fetch editing data for preview ${JSON.stringify(context.previewData)}`
        );
      }

      props.locale = context.previewData.language;
      props.layoutData = componentData;
      props.headLinks = [];

      return props;
    }

    return props;
  }
}

export const componentLibraryModePlugin = new ComponentLibraryModePlugin();
