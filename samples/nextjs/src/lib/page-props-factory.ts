import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  ComponentPropsService,
  DictionaryPhrases,
  DictionaryService,
  LayoutServiceData,
  editingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import { layoutServiceFactory } from 'lib/layout-service-factory';
import { componentModule } from 'temp/componentFactory';
import { config as packageConfig } from '../../package.json';

/**
 * Extract normalized Sitecore item path from query
 * @param {ParsedUrlQuery | undefined} params
 */
function extractPath(params: ParsedUrlQuery | undefined): string {
  if (params === undefined) {
    return '/';
  }
  let path = Array.isArray(params.path) ? params.path.join('/') : params.path ?? '/';

  // Ensure leading '/'
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return path;
}

/**
 * Determines whether context is GetServerSidePropsContext (SSR) or GetStaticPropsContext (SSG)
 * @param {GetServerSidePropsContext | GetStaticPropsContext} context
 */
const isServerSidePropsContext = function (
  context: GetServerSidePropsContext | GetStaticPropsContext
): context is GetServerSidePropsContext {
  return (<GetServerSidePropsContext>context).req !== undefined;
};

export class SitecorePagePropsFactory {
  private componentPropsService: ComponentPropsService;
  private dictionaryService: DictionaryService;

  constructor() {
    this.componentPropsService = new ComponentPropsService();
    this.dictionaryService = dictionaryServiceFactory.create();
  }

  /**
   * Create SitecorePageProps for given context (SSR / GetServerSidePropsContext or SSG / GetStaticPropsContext)
   * @param {GetServerSidePropsContext | GetStaticPropsContext} context
   * @see SitecorePageProps
   */
  public async create(
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps> {
    let locale: string,
      layoutData: LayoutServiceData | null,
      dictionary: DictionaryPhrases,
      componentProps = {},
      notFound = false,
      isPreview = false;

    if (context.preview) {
      /**
       * Preview mode
       */
      // If we're in preview (editing) mode, use data already sent along with the editing request
      const data = await editingDataService.getEditingData(context.previewData);
      if (!data) {
        throw new Error(
          `Unable to get editing data for preview ${JSON.stringify(context.previewData)}`
        );
      }
      locale = data.language;
      layoutData = data.layoutData;
      dictionary = data.dictionary;
      isPreview = true;
    } else {
      /**
       * Normal mode
       */
      // Get normalized Sitecore item path
      const path = extractPath(context.params);

      // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
      locale = context.locale ?? packageConfig.language;

      // Fetch layout data, passing on req/res for SSR
      const isSsrContext = isServerSidePropsContext(context);
      const layoutService = layoutServiceFactory.create(isSsrContext);

      layoutData = await layoutService.fetchLayoutData(
        path,
        locale,
        isSsrContext ? (context as GetServerSidePropsContext).req : undefined,
        isSsrContext ? (context as GetServerSidePropsContext).res : undefined
      );

      if (!layoutData.sitecore.route) {
        // A missing route value signifies an invalid path, so set notFound.
        // Our page routes will return this in getStatic/ServerSideProps,
        // which will trigger our custom 404 page with proper 404 status code.
        // You could perform additional logging here to track these if desired.
        notFound = true;
      }

      // Fetch dictionary data
      dictionary = await this.dictionaryService.fetchDictionaryData(locale);
    }

    // Retrieve component props using side-effects defined on components level
    if (layoutData?.sitecore?.route) {
      if (isServerSidePropsContext(context)) {
        componentProps = await this.componentPropsService.fetchServerSideComponentProps({
          layoutData: layoutData,
          context,
          componentModule,
        });
      } else {
        componentProps = await this.componentPropsService.fetchStaticComponentProps({
          layoutData: layoutData,
          context,
          componentModule,
        });
      }
    }
    return {
      locale,
      layoutData,
      dictionary,
      componentProps,
      notFound,
      isPreview,
    };
  }
}

export const sitecorePagePropsFactory = new SitecorePagePropsFactory();
