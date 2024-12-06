import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  SiteInfo,
  personalizeLayout,
  getGroomedVariantIds,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  editingDataService,
  isComponentLibraryPreviewData,
  isEditingMetadataPreviewData,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { SitecorePageProps } from 'lib/page-props';
import { graphQLEditingService } from 'lib/graphql-editing-service';
import { Plugin } from '..';
import { RestComponentLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

class PreviewModePlugin implements Plugin {
  order = 1;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;

    if (isComponentLibraryPreviewData(context.previewData)) {
      const { itemId, componentUid, site, language, renderingId, dataSourceId, version, variant } =
        context.previewData;

      const componentService = new RestComponentLayoutService({
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

      // we can reuse editing service, fortunately
      const dictionaryData = await graphQLEditingService.fetchDictionaryData({
        siteName: site,
        language,
      });

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

    // If we're in Pages preview (editing) Metadata Edit Mode, prefetch the editing data
    if (isEditingMetadataPreviewData(context.previewData)) {
      const { site, itemId, language, version, variantIds, layoutKind } = context.previewData;

      const data = await graphQLEditingService.fetchEditingData({
        siteName: site,
        itemId,
        language,
        version,
        layoutKind,
      });

      if (!data) {
        throw new Error(
          `Unable to fetch editing data for preview ${JSON.stringify(context.previewData)}`
        );
      }

      props.site = data.layoutData.sitecore.context.site as SiteInfo;
      props.locale = context.previewData.language;
      props.layoutData = data.layoutData;
      props.dictionary = data.dictionary;
      props.headLinks = [];
      const personalizeData = getGroomedVariantIds(variantIds);
      personalizeLayout(
        props.layoutData,
        personalizeData.variantId,
        personalizeData.componentVariantIds
      );

      return props;
    }

    // If we're in preview (editing) Chromes Edit Mode, use data already sent along with the editing request
    // This mode is used by the Experience Editor.
    // In Pages it's treated as a legacy mode but still supported for backward compatibility.
    const data = await editingDataService.getEditingData(context.previewData);
    if (!data) {
      throw new Error(
        `Unable to get editing data for preview ${JSON.stringify(context.previewData)}`
      );
    }
    props.site = data.layoutData.sitecore.context.site as SiteInfo;
    props.locale = data.language;
    props.layoutData = data.layoutData;
    props.dictionary = data.dictionary;
    props.headLinks = [];

    return props;
  }
}

export const previewModePlugin = new PreviewModePlugin();
