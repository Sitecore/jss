import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from 'lib/page-props-factory';
import { GraphQLErrorPagesService } from '@sitecore-jss/sitecore-jss-nextjs';
import { isServerSidePropsContext } from '..';
import config from 'temp/config';

class ErrorPagesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    const errorPagesService = new GraphQLErrorPagesService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      language: props.locale,
    });
    const resultErrorPages = await errorPagesService.fetchErrorPages();

    if (isServerSidePropsContext(context) && context.res.statusCode >= 500 && context.res.statusCode <= 511 && resultErrorPages?.serverErrorPagePath) {
      return {
        ...props,
        redirect: {
          destination: resultErrorPages.serverErrorPagePath,
          permanent: false,
        }
      }
    }

    if (props.notFound && resultErrorPages?.notFoundPagePath) {
      return {
        ...props,
        redirect: {
          destination: resultErrorPages.notFoundPagePath,
          permanent: false,
        }
      }
    }

    return props;
  }
}

export const errorPagesPlugin = new ErrorPagesPlugin();
