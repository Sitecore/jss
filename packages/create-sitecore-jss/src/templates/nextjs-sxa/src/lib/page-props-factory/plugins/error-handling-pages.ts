import { SitecorePageProps } from 'lib/page-props';
import { GraphQLErrorHandlingService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { Plugin } from '../../../../../nextjs/src/lib/page-props-factory';

class ErrorHandlingPagesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    const errorHandlingService = new GraphQLErrorHandlingService({
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
