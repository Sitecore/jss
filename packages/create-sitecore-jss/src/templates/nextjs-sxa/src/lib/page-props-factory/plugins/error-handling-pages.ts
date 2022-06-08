import { SitecorePageProps } from 'lib/page-props';
import { Plugin } from 'lib/page-props-factory';
import { GraphQLErrorHandlingPagesService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

class ErrorHandlingPagesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    const errorHandlingService = new GraphQLErrorHandlingPagesService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      language: props.locale,
    });

    props.errorHandlingPages = {...await errorHandlingService.fetchErrorHandling()};
  
    return props;
  }
}

export const errorHandlingPagesPlugin = new ErrorHandlingPagesPlugin();
