import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { DictionaryService, LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import { layoutServiceFactory } from 'lib/layout-service-factory';
import { SitecorePageProps } from 'lib/page-props';
import { pathExtractor } from 'lib/path-extractor';
import { Plugin, isServerSidePropsContext } from '..';
import { normalize } from '../normalize';
import pkg from '../../../../package.json';

class NormalModePlugin implements Plugin {
  private dictionaryServices: Map<string, DictionaryService>;
  private layoutServices: Map<string, LayoutService>;

  order = 5;

  constructor() {
    this.dictionaryServices = new Map<string, DictionaryService>();
    this.layoutServices = new Map<string, LayoutService>();
  }

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (context.preview) return props;

    let path = normalize(context.params);

    /**
     * Normal mode
     */
    // Get normalized Sitecore item path
    path = pathExtractor.extract(path);

    // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
    props.locale = context.locale ?? pkg.config.language;

    // Fetch layout data, passing on req/res for SSR
    const layoutService = this.getLayoutService(props.site.name);
    props.layoutData = await layoutService.fetchLayoutData(
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
    const dictionaryService = this.getDictionaryService(props.site.name);
    props.dictionary = await dictionaryService.fetchDictionaryData(props.locale);

    return props;
  }

  private getLayoutService(siteName: string): LayoutService {
    if (this.layoutServices.has(siteName)) {
      return this.layoutServices.get(siteName) as LayoutService;
    }

    const layoutService = layoutServiceFactory.create(siteName);
    this.layoutServices.set(siteName, layoutService);

    return layoutService;
  }

  private getDictionaryService(siteName: string): DictionaryService {
    if (this.dictionaryServices.has(siteName)) {
      return this.dictionaryServices.get(siteName) as DictionaryService;
    }

    const dictionaryService = dictionaryServiceFactory.create(siteName);
    this.dictionaryServices.set(siteName, dictionaryService);

    return dictionaryService;
  }
}

export const normalModePlugin = new NormalModePlugin();
