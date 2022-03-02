import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { DictionaryService, LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import { layoutServiceFactory } from 'lib/layout-service-factory';
import { SitecorePageProps } from 'lib/page-props';
import { Plugin, isServerSidePropsContext } from '..';
import pkg from '../../../../package.json';
import { personalizeLayout } from './../../layout-personalizer';

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

  // Remove SegmentId part from path, otherwise layout service will not find layout data
  if (path.includes('_segmentId_')) {
    const result = path.match('_segmentId_.*?\\/');
    path = result === null ? '/' : path.replace(result[0], '');
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

    // Get segment for personalization (from path)
    let filtered = null;
    if (context !== null) {
      // temporery disable null assertion
      if (Array.isArray(context!.params!.path)) {
        filtered = context!.params!.path.filter((e) => e.includes('_segmentId_'));
      }
    }

    const segment =
      filtered === null || filtered.length == 0
        ? '_default'
        : filtered[0].replace('_segmentId_', '');

    // modify layoutData to use specific segment instead of default
    personalizeLayout(props.layoutData, segment);

    return props;
  }
}

export const normalModePlugin = new NormalModePlugin();
