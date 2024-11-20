import clientFactory from './src/app/lib/graphql-client-factory';
import { getGraphQLClientFactoryConfig } from './src/app/lib/graphql-client-factory/config';
import { dictionaryServiceFactory } from './src/app/lib/dictionary-service-factory';
import { layoutServiceFactory } from './src/app/lib/layout-service-factory';
import { environment } from './src/environments/environment';
import { components } from './src/app/components/app-components.module';
import metadata from './src/environments/metadata.json';
/**
 * Define the required configuration values to be exported from the server.bundle.ts.
 */

const defaultLanguage = environment.defaultLanguage;
const sitecoreSiteName = environment.sitecoreSiteName;
const personalizeScope = environment.personalizeScope;
const getClientFactoryConfig = getGraphQLClientFactoryConfig;

export {
  clientFactory,
  getClientFactoryConfig,
  dictionaryServiceFactory,
  layoutServiceFactory,
  defaultLanguage,
  sitecoreSiteName,
  personalizeScope,
  components,
  metadata,
};
