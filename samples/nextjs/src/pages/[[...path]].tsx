import { AxiosError } from 'axios';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import Layout from 'components/Layout';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps, extractPath } from 'lib/page-props';
import componentFactory from 'temp/componentFactory';
import { configBasedLayoutService as layoutService } from 'lib/layout-service';
import { configBasedDictionaryService as dictionaryService } from 'lib/dictionary-service';

const SitecorePage: NextPage<SitecorePageProps> = (props) => {
  const { layoutData } = props;

  if (!layoutData?.sitecore?.route) {
    // layoutData will be missing for an invalid path
    return <Error statusCode={404} />;
  }

  const context = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  return (
    <SitecoreContext componentFactory={componentFactory} context={context}>
      <Layout route={layoutData.sitecore.route} />
    </SitecoreContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.BUILD_MODE === 'export') {
    // If performing an export, fallback is not allowed.
    // Use hard-coded values for now for demo-purposes.
    // Ultimately, this is where we'll request a "sitemap" from Sitecore.
    return {
      paths: [
        { params: { path: [''] }, locale: 'en' },
        { params: { path: ['styleguide'] }, locale: 'en' },
        { params: { path: ['styleguide', 'custom-route-type'] }, locale: 'en' },
        { params: { path: ['graphql'] }, locale: 'en' },
      ],
      fallback: false,
    };
  } else {
    // Fallback, along with revalidate in getStaticProps (below),
    // enables Incremental Static Regeneration. This allows us to
    // leave certain (or all) paths empty if desired and static pages
    // will be generated on request.
    // See https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const path = extractPath(params);

  const props: SitecorePageProps = {
    locale: locale ?? 'en',
    layoutData: null,
    dictionary: null,
  };

  // Retrieve layoutData from Layout Service
  props.layoutData = await layoutService
    .fetchLayoutData(path, props.locale)
    .catch((error: AxiosError) => {
      // Let 404s (invalid path) through
      if (error.response?.status === 404) return null;
      throw error;
    });

  // Retrieve dictionary data from Dictionary Service
  props.dictionary = await dictionaryService.fetchDictionaryData(props.locale);

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
  };
};

export default SitecorePage;
