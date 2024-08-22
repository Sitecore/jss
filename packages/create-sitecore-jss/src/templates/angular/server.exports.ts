import { environment } from './src/environments/environment';

/**
 * Define the required configuration values to be exported from the server.bundle.ts.
 */

const apiKey = environment.sitecoreApiKey;
const siteName = environment.sitecoreSiteName;

export {
  apiKey,
  siteName,
};
