import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { DictionaryService, LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import { layoutServiceFactory } from 'lib/layout-service-factory';
import { SitecorePageProps } from 'lib/page-props';
import { Plugin, isServerSidePropsContext } from '..';
import pkg from '../../../../package.json';

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

class NormalModePlugin implements Plugin {
  private dictionaryService: DictionaryService;
  private layoutService: LayoutService;

  order = 0;

  constructor() {
    this.dictionaryService = dictionaryServiceFactory.create();
    this.layoutService = layoutServiceFactory.create();
  }

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (context.preview) return props;

    /**
     * Normal mode
     */
    // Get normalized Sitecore item path
    const path = extractPath(context.params);

    // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
    props.locale = context.locale ?? pkg.config.language;

    // Fetch layout data, passing on req/res for SSR
    props.layoutData = await this.layoutService.fetchLayoutData(
      path,
      props.locale,
      // eslint-disable-next-line prettier/prettier
      isServerSidePropsContext(context) ? (context as GetServerSidePropsContext).req : undefined,
      isServerSidePropsContext(context) ? (context as GetServerSidePropsContext).res : undefined
    );

    if (!props.layoutData.sitecore.route) {
      // A missing route value signifies an invalid path, so set notFound.
      // Our page routes will return this in getStatic/ServerSideProps,
      // which will trigger our custom 404 page with proper 404 status code.
      // You could perform additional logging here to track these if desired.
      props.notFound = true;
    }

    // Fetch dictionary data
    props.dictionary = await this.dictionaryService.fetchDictionaryData(props.locale);

    return props;
  }
}

export const normalModePlugin = new NormalModePlugin();
