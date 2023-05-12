import config from 'temp/config';
import { GraphQLErrorPagesService, SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import NotFound from 'src/NotFound';
import { componentFactory } from 'temp/componentFactory';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import { siteResolver } from 'lib/site-resolver';

const Custom404 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <NotFound />;
  }

  return (
    <SitecoreContext componentFactory={componentFactory} layoutData={props.layoutData}>
      <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
    </SitecoreContext>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.jssAppName);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
    language: context.locale || config.defaultLanguage,
  });

  const resultErrorPages = await errorPagesService.fetchErrorPages();

  return {
    props: {
      layoutData: resultErrorPages?.notFoundPage?.rendered || null,
    },
  };
};

export default Custom404;
