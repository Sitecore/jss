import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from 'lib/page-props-factory';
import { GraphQLErrorPagesService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

class ErrorPagesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    const errorPagesService = new GraphQLErrorPagesService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      language: props.locale,
    });

    props.errorPages = {...await errorPagesService.fetchErrorPages()};
  
    return props;
  }
}

export const errorPagesPlugin = new ErrorPagesPlugin();
