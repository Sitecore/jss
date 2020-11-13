import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { AxiosError } from 'axios';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'components/Layout';
import { SitecorePageProps, extractPath } from 'lib/page-props';
import componentFactory from 'temp/componentFactory';
import { configBasedLayoutService as layoutService } from 'lib/layout-service';
import { configBasedDictionaryService as dictionaryService } from 'lib/dictionary-service';

const SitecorePage = ({ layoutData }: SitecorePageProps): JSX.Element => {
  if (!layoutData?.sitecore?.route) {
    // layoutData will be missing for an invalid path
    return <Error statusCode={404} />;
  }

  const context = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  const PageLayout = () => (
    <SitecoreContext componentFactory={componentFactory} context={context}>
      <Layout route={layoutData.sitecore.route} />
    </SitecoreContext>
  );

  return <PageLayout />;
};

// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async ({ params, locale, req, res }) => {
  const path = extractPath(params);

  const props: SitecorePageProps = {
    locale: locale ?? 'en',
    layoutData: null,
    dictionary: null,
  };

  // Retrieve layoutData from Layout Service for path.
  // Note we pass along req/res here as well to allow transfer of
  // headers for proper Sitecore analytics tracking.
  props.layoutData = await layoutService
    .fetchLayoutData(path, props.locale, req, res)
    .catch((error: AxiosError) => {
      // Let 404s (invalid path) through
      if (error.response?.status === 404) return null;
      throw error;
    });

  // Retrieve dictionary data from Dictionary Service
  props.dictionary = await dictionaryService.fetchDictionaryData(props.locale);

  return {
    props,
  };
};

export default SitecorePage;
