import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import Layout from 'src/Layout';
import config from 'temp/config';
import {
  ComponentPropsContext,
  GraphQLErrorPagesService,
  SitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { componentFactory } from 'temp/componentFactory';
import { SitecorePageProps } from 'lib/page-props';
import ServerError from 'src/ServerError';

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
  }

  return (
    <ComponentPropsContext value={{}}>
      <SitecoreContext componentFactory={componentFactory} layoutData={props.layoutData}>
        <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

export async function getStaticProps(context: SitecorePageProps) {
  const props = await sitecorePagePropsFactory.create(context);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: props.site.name,
    language: (props.site.locale || context.locale) as string,
  });

  const resultErrorPages = await errorPagesService.fetchErrorPages();

  return {
    props: {
      ...props,
      layoutData: resultErrorPages?.serverErrorPage?.rendered || null,
    },
  };
}

export default Custom500;
