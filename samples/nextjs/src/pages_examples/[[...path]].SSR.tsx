import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { AxiosError } from 'axios';
import {
  SitecoreContext,
  ComponentPropsContext,
  ComponentPropsService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'components/Layout';
import { SitecorePageProps, extractPath } from 'lib/page-props';
import { componentFactory, componentModule } from 'temp/componentFactory';
import { configBasedLayoutService as layoutService } from 'lib/layout-service';
import { configBasedDictionaryService as dictionaryService } from 'lib/dictionary-service';
import { config as packageConfig } from '../../package.json';

const componentPropsService = new ComponentPropsService();

const SitecorePage = ({ layoutData, componentProps }: SitecorePageProps): JSX.Element => {
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
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext componentFactory={componentFactory} context={context}>
        <Layout route={layoutData.sitecore.route} />
      </SitecoreContext>
    </ComponentPropsContext>
  );

  return <PageLayout />;
};

// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, locale, req, res } = context;
  const path = extractPath(params);

  const props: SitecorePageProps = {
    // Use context locale if Next.js i18n is configured, otherwise use language defined in package.json
    locale: locale ?? packageConfig.language,
    layoutData: null,
    dictionary: null,
    componentProps: {},
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

  if (props.layoutData) {
    props.componentProps = await componentPropsService.fetchServerSideComponentProps({
      layoutData: props.layoutData,
      context,
      componentModule,
    });
  }

  // Retrieve dictionary data from Dictionary Service
  props.dictionary = await dictionaryService.fetchDictionaryData(props.locale);

  return {
    props,
  };
};

export default SitecorePage;
