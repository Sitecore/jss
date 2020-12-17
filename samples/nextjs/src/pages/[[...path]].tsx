import { AxiosError } from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from 'components/NotFound';
import Layout from 'components/Layout';
import {
  SitecoreContext,
  ComponentPropsContext,
  ComponentPropsService,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps, extractPath } from 'lib/page-props';
import { componentFactory, componentModule } from 'temp/componentFactory';
import { layoutService } from 'lib/layout-service';
import { configBasedDictionaryService as dictionaryService } from 'lib/dictionary-service';
import { config as packageConfig } from '../../package.json';

const componentPropsService = new ComponentPropsService();

const SitecorePage = ({ layoutData, componentProps }: SitecorePageProps): JSX.Element => {
  if (!layoutData?.sitecore?.route) {
    // layoutData will be missing for an invalid path
    return <NotFound context={layoutData?.sitecore?.context} />;
  }

  const context = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  const routeData = layoutData.sitecore.route;

  const PageLayout = () => (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext componentFactory={componentFactory} context={context}>
        <Layout route={routeData} />
      </SitecoreContext>
    </ComponentPropsContext>
  );

  return <PageLayout />;
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async () => {
  // Fallback, along with revalidate in getStaticProps (below),
  // enables Incremental Static Regeneration. This allows us to
  // leave certain (or all) paths empty if desired and static pages
  // will be generated on request.
  // See https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  //
  // Ultimately, this is where we'll also be able to request a "sitemap" from Sitecore.
  return {
    paths: [],
    fallback: 'blocking',
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  const { params, locale } = context;
  const path = extractPath(params);

  const props: SitecorePageProps = {
    // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
    locale: locale ?? packageConfig.language,
    layoutData: null,
    dictionary: null,
    componentProps: {},
  };

  // Retrieve layoutData from Layout Service
  props.layoutData = await layoutService
    .fetchLayoutData(path, props.locale)
    .catch((error: AxiosError<LayoutServiceData>) => {
      // Let 404s (invalid path) through
      if (error.response?.status === 404) return error.response.data;

      throw error;
    });

  if (props.layoutData.sitecore.route) {
    // Retrieve component props using side-effects defined on components level
    props.componentProps = await componentPropsService.fetchStaticComponentProps({
      layoutData: props.layoutData,
      context,
      componentModule,
    });

    // Retrieve dictionary data from Dictionary Service
    props.dictionary = await dictionaryService.fetchDictionaryData(props.locale);
  }

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
  };
};

export default SitecorePage;
