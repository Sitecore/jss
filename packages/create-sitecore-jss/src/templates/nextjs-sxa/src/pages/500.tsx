import { GetStaticProps } from 'next';
import { JSX } from 'react';
import Head from 'next/head';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ComponentPropsContext,
  ErrorPages,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import Layout from 'src/Layout';
import { componentBuilder } from 'temp/componentBuilder';
import { siteResolver } from 'lib/site-resolver';
import clientFactory from 'lib/graphql-client-factory';
import { fetchComponentProps } from 'lib/component-props';
import config from 'temp/config';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>500 Internal Server Error</h1>
      <p>There is a problem with the resource you are looking for, and it cannot be displayed.</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
  }

  return (
    <ComponentPropsContext value={props.componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory()}
        layoutData={props.layoutData}
      >
        <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.sitecoreSiteName);
  const errorPagesService = new GraphQLErrorPagesService({
    clientFactory,
    siteName: site.name,
    language: context.locale || context.defaultLocale || config.defaultLanguage,
    retries:
      (process.env.GRAPH_QL_SERVICE_RETRIES &&
        parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
      0,
  });
  let resultErrorPages: ErrorPages | null = null;

  if (process.env.DISABLE_SSG_FETCH?.toLowerCase() !== 'true') {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  const layoutData = resultErrorPages?.notFoundPage?.rendered || null;

  let componentProps = {};

  if (layoutData?.sitecore?.route) {
    componentProps = await fetchComponentProps(layoutData, context);
  }

  return {
    props: {
      headLinks: [],
      layoutData,
      componentProps,
    },
  };
};

export default Custom500;
