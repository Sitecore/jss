import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from '..';

class PreviewModePlugin implements Plugin {
  order = 1;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;

    // Preview (editing) data sent along with the Experience Editor's editing request.
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
