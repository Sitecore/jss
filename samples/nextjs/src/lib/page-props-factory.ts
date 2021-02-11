import { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  ComponentPropsService,
  DictionaryPhrases,
  DictionaryService,
  RestDictionaryService,
  LayoutServiceData,
  LayoutService,
  RestLayoutService,
  editingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { componentModule } from 'temp/componentFactory';
import { config as packageConfig } from '../../package.json';
import config from 'temp/config';

/**
 * Extract normalized Sitecore item path from query
 * @param {ParsedUrlQuery | undefined} params
 */
const extractPath = function (params: ParsedUrlQuery | undefined): string {
  if (params === undefined) {
    return '/';
  }
  let path = Array.isArray(params.path) ? params.path.join('/') : params.path ?? '/';

  // Ensure leading '/'
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return path;
};

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
  private layoutService: LayoutService;

  constructor() {
    this.componentPropsService = new ComponentPropsService();

    // Note we're using our standard REST-based dictionary and layout services here,
    // but in the very near future we'll also have GraphQL-based counterparts available (for Sitecore Experience Edge).
    this.dictionaryService = new RestDictionaryService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
    this.layoutService = new RestLayoutService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
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
      layoutData: LayoutServiceData,
      dictionary: DictionaryPhrases,
      componentProps = {},
      notFound = false;

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
    } else {
      /**
       * Normal mode
       */
      // Get normalized Sitecore item path
      const path = extractPath(context.params);

      // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
      locale = context.locale ?? packageConfig.language;

      // Fetch layout data, passing on req/res for SSR
      layoutData = await this.layoutService
        .fetchLayoutData(
          path,
          locale,
          // eslint-disable-next-line prettier/prettier
          isServerSidePropsContext(context) ? (context as GetServerSidePropsContext).req : undefined,
          isServerSidePropsContext(context) ? (context as GetServerSidePropsContext).res : undefined
        )
        .catch((error) => {
          if (error.isAxiosError) {
            // RestLayoutService uses Axios by default
            const axiosError = error as AxiosError<LayoutServiceData>;
            if (axiosError.response?.status === 404) {
              // Let 404s (invalid path) through for RestLayoutService.
              // layoutData.sitecore.route will be missing, but
              // layoutData.sitecore.context will provide valuable information
              notFound = true;
              return axiosError.response?.data;
            }
          }
          throw error;
        });

      // Fetch dictionary data
      dictionary = await this.dictionaryService.fetchDictionaryData(locale);
    }

    // Retrieve component props using side-effects defined on components level
    if (layoutData.sitecore.route) {
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
    };
  }
}

export const sitecorePagePropsFactory = new SitecorePagePropsFactory();
