import { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  ComponentPropsService,
  DictionaryService,
  LayoutService,
  LayoutServiceData,
  EditingPreviewData,
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
  private _dictionaryService: DictionaryService;
  private _layoutService: LayoutService;

  constructor() {
    this.componentPropsService = new ComponentPropsService();
    this._dictionaryService = new DictionaryService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
    this._layoutService = new LayoutService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }

  private get layoutService(): LayoutService {
    // Just returning our REST layout service atm, but in the very
    // near future we'll also have a GraphQL-based layout service.
    // Stubbed out as getter for potential logic here (e.g. based on constructor props)...
    return this._layoutService;
  }

  private get dictionaryService(): DictionaryService {
    // Just returning our REST dictionary service atm, but in the very
    // near future we'll also have a GraphQL-based dictionary service.
    // Stubbed out as getter for potential logic here (e.g. based on constructor props)...
    return this._dictionaryService;
  }

  /**
   * Create SitecorePageProps for given context (SSR / GetServerSidePropsContext or SSG / GetStaticPropsContext)
   * @param {GetServerSidePropsContext | GetStaticPropsContext} context
   * @see SitecorePageProps
   */
  public async create(
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps> {
    if (context.preview) {
      // If we're in preview (editing) mode, use data already sent along with the editing request
      return this.createForEditing(context.previewData);
    }

    // Get normalized Sitecore item path
    const path = extractPath(context.params);

    // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
    const locale = context.locale ?? packageConfig.language;

    let notFound = false;

    // Fetch layoutData from Layout Service, passing on req/res for SSR
    const layoutData = await this.layoutService
      .fetchLayoutData(
        path,
        locale,
        isServerSidePropsContext(context) ? (context as GetServerSidePropsContext).req : undefined,
        isServerSidePropsContext(context) ? (context as GetServerSidePropsContext).res : undefined
      )
      .catch((error: AxiosError<LayoutServiceData>) => {
        if (error.response?.status === 404) {
          // Let 404s (invalid path) through.
          // layoutData.sitecore.route will be missing, but
          // layoutData.sitecore.context will provide valuable information
          notFound = true;
          return error.response.data;
        }
        throw error;
      });

    // Fetch dictionary data from Dictionary Service
    const dictionary = await this.dictionaryService.fetchDictionaryData(locale);

    // Retrieve component props using side-effects defined on components level
    let componentProps = {};
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

  /**
   * Create SitecorePageProps using preview (editing) data
   * @param {EditingPreviewData} previewData
   */
  private async createForEditing(previewData: EditingPreviewData): Promise<SitecorePageProps> {
    const data = await editingDataService.getEditingData(previewData);
    if (!data) {
      throw new Error(`Unable to get editing data for preview ${JSON.stringify(previewData)}`);
    }
    return {
      locale: data.language,
      layoutData: data.layoutData,
      dictionary: data.dictionary,
      componentProps: {},
      notFound: false,
    };
  }
}

export const sitecorePagePropsFactory = new SitecorePagePropsFactory();
