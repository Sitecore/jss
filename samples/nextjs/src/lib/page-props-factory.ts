import { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext, NextPageContext } from 'next';
import {
  ComponentPropsService,
  EditingRequest,
  LayoutService,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { componentModule } from 'temp/componentFactory';
import { layoutService } from 'lib/layout-service';
import { DictionaryService, dictionaryService } from 'lib/dictionary-service';
import { config as packageConfig } from '../../package.json';

/**
 * Extract normalized Sitecore item path from query
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
 * Determine if Next.js context is GetServerSidePropsContext
 * @param context {GetStaticPropsContext|GetServerSidePropsContext}
 */
const isGetServerSidePropsContext = function (
  context: GetServerSidePropsContext | GetStaticPropsContext
): context is GetServerSidePropsContext {
  return 'req' in context;
};

export class SitecorePagePropsFactory {
  private get componentPropsService(): ComponentPropsService {
    return new ComponentPropsService();
  }

  private get layoutService(): LayoutService {
    // Just returning our REST layout service atm, but in the very
    // near future we'll also have a GraphQL-based layout service.
    // Stubbed out as getter for potential logic here (e.g. based on constructor props)...
    return layoutService;
  }

  private get dictionaryService(): DictionaryService {
    // Just returning our REST dictionary service atm, but in the very
    // near future we'll also have a GraphQL-based dictionary service.
    // Stubbed out as getter for potential logic here (e.g. based on constructor props)...
    return dictionaryService;
  }

  /**
   * Create SitecorePageProps in an SSG/SSR context (within getStaticProps/getServerSideProps function).
   * @param context {GetStaticPropsContext|GetServerSidePropsContext}
   * @see SitecorePageProps
   */
  public async create<T extends GetStaticPropsContext | GetServerSidePropsContext>(
    context: T
  ): Promise<SitecorePageProps> {
    // Get normalized Sitecore item path
    const path = extractPath(context.params);
    // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
    const locale = context.locale ?? packageConfig.language;

    let notFound = false;

    // Retrieve layoutData from Layout Service
    const layoutData = await this.layoutService
      .fetchLayoutData(path, locale)
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

    // Retrieve component props using side-effects defined on components level
    let componentProps = {};
    if (layoutData.sitecore.route) {
      if (isGetServerSidePropsContext(context)) {
        componentProps = await this.componentPropsService.fetchServerSideComponentProps({
          layoutData,
          context,
          componentModule,
        });
      } else {
        componentProps = await this.componentPropsService.fetchStaticComponentProps({
          layoutData,
          context,
          componentModule,
        });
      }
    }

    // Retrieve dictionary data from Dictionary Service
    const dictionary = await this.dictionaryService.fetchDictionaryData(locale);

    return {
      locale,
      layoutData,
      dictionary,
      componentProps,
      notFound,
    };
  }

  /**
   * Create SitecorePageProps in an editing context (within getInitialProps function).
   * If you're not supporting Experience Editor, you can remove this.
   * @param context {NextPageContext}
   * @see SitecorePageProps
   */
  public async createForEditing(context: NextPageContext): Promise<SitecorePageProps> {
    // Grab Experience Editor data which has been stashed on the request
    const data = (context.req as EditingRequest).editingData;

    // Retrieve component props using side-effects defined on components level
    let componentProps = {};
    if (data.layoutData.sitecore.route) {
      componentProps = await this.componentPropsService.fetchInitialComponentProps({
        layoutData: data.layoutData,
        context,
        componentModule,
      });
    }

    return {
      locale: data.language,
      layoutData: data.layoutData,
      dictionary: data.dictionary,
      componentProps,
      notFound: false,
    };
  }
}
