import { JSX } from 'react';
import { GetStaticProps } from 'next';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ComponentPropsContext,
  ErrorPages,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import NotFound from 'src/NotFound';
import { componentBuilder } from 'temp/componentBuilder';
import Layout from 'src/Layout';
import { siteResolver } from 'lib/site-resolver';
import { fetchComponentProps } from 'lib/component-props';
import clientFactory from 'lib/graphql-client-factory';
import config from 'temp/config';

const Custom404 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <NotFound />;
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
    language: context.locale || config.defaultLanguage,
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

export default Custom404;
