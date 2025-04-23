import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  SiteInfo,
  personalizeLayout,
  getGroomedVariantIds,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  editingDataService,
  isEditingMetadataPreviewData,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { SitecorePageProps } from 'lib/page-props';
import { graphQLEditingService } from 'lib/graphql-editing-service';
import { Plugin } from '..';

class PreviewModePlugin implements Plugin {
  order = 1;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;

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
