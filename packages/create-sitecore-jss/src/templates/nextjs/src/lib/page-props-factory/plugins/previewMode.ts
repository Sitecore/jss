import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';

class PreviewModePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;

    // If we're in preview (editing) mode, use data already sent along with the editing request
    const data = await editingDataService.getEditingData(context.previewData);
    if (!data) {
      throw new Error(
        `Unable to get editing data for preview ${JSON.stringify(context.previewData)}`
      );
    }
    props.locale = data.language;
    props.layoutData = data.layoutData;
    props.dictionary = data.dictionary;

    return props;
  }
}

export const previewModePlugin = new PreviewModePlugin();
