import { dataApi } from '@sitecore-jss/sitecore-jss-nextjs';
import { AxiosDataFetcher } from './data-fetcher';
import config from '../temp/config';
import { IncomingMessage, ServerResponse } from 'http';

export class LayoutService {

  constructor(
    private apiHost: string, 
    private apiKey: string, 
    private siteName: string
  ) {}

  private getFetchOptions = (language?: string) => {
    let params: any = {};
    if (language) {
      params.sc_lang = language;
    }
    params.sc_apikey = this.apiKey;
    params.sc_site = this.siteName;

    // Enables/disables analytics tracking for the Layout Service invocation (default is true).
    // More than likely, this would be set to false for SSG/hybrid implementations, and the
    // JSS tracker would instead be used on the client-side: https://jss.sitecore.com/docs/fundamentals/services/tracking
    params.tracking = true;

    return {
      layoutServiceConfig: {
        host: this.apiHost,
      },
      querystringParams: { ...params }
    };
  }

  fetchLayoutData(itemPath: string, language?: string, req?: IncomingMessage, res?: ServerResponse) {
    const fetchOptions = this.getFetchOptions(language);
    const axiosFetcher = new AxiosDataFetcher();

    if (req && res) {

      // If we have access to the request/response (SSR), we want to pass along
      // certain headers to properly allow Sitecore analytics tracking.
      //
      // In particular:
      //  cookie (request)
      //  user-agent (request)
      //  referer (request)
      //  X-Forwarded-For (request)
      //  set-cookie (response)
      //  
      // Obviously might need to be a bit more graceful about all this 
      // (not stomping on existing data potentially), but you get the point ...

      axiosFetcher.instance.interceptors.request.use((config) => {
        //console.log("Incoming request headers from browser:", req.headers);
        if (req.headers['cookie']) {
          config.headers.common['cookie'] = req.headers['cookie'];
        }
        if (req.headers['referer']) {
          config.headers.common['referer'] = req.headers['referer']
        }
        if (req.headers['user-agent']) {
          config.headers.common['user-agent'] = req.headers['user-agent']
        }
        if (req.connection.remoteAddress) {
          config.headers.common['X-Forwarded-For'] = req.connection.remoteAddress;
        }
        //console.log("Modified request headers to Layout Service:", config.headers);
        return config;
      });

      axiosFetcher.instance.interceptors.response.use((response) => {
        //console.log("Incoming response headers from Layout Service:", response.headers);
        if (response.headers['set-cookie']) {
          res.setHeader('set-cookie', response.headers['set-cookie']);
        }
        return response;
      });
    }

    const fetcher = (url: string, data?: any) => { return axiosFetcher.fetch(url, data) };
    return dataApi.fetchRouteData(itemPath, { fetcher, ...fetchOptions });
  }
}

var configBasedLayoutService = new LayoutService(config.sitecoreApiHost, config.sitecoreApiKey, config.jssAppName);
export { configBasedLayoutService };