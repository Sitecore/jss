import { GraphQLPersonalizeService } from 'lib/graphql-personalize-service';
import { GraphQLSiteInfoService, type SiteInfo } from 'lib/graphql-siteinfo-service';

export default defineNuxtRouteMiddleware( async (to, from) => {


  console.log('start hybrid middleware');
    const nuxtApp = useNuxtApp()

    // multisite
    let host = '';
    if(process.server) {
      host = nuxtApp.ssrContext?.event.node.req.headers.host || '';
    } else {
      host = window.location.host;
    }
    let sitesList: SiteInfo[] = [];
    const runtimeConfig = useRuntimeConfig();
    // Implementing different ways to resolve sites on client and server
    // Middleware is executed in both contexts - and config is not being resolved on client for some reason
    if (process.server) {
      const config = (await import('temp/config')).default;
      sitesList = JSON.parse(config.sites);
    }
    if (process.client) {
      const siteInfoService = new GraphQLSiteInfoService({
        endpoint: runtimeConfig.public.graphQLEndpoint,
        apiKey: runtimeConfig.public.sitecoreApiKey,
      });
      sitesList = await siteInfoService.fetchSiteInfo();
    }
    const resolvedSite = sitesList.find(elem => elem.hostName === host || elem.hostName === '*' || elem.hostName === '')?.name;
    console.log(resolvedSite);
    console.log(to);
    const querySite = to.query['sc_site'];
    const site = useState('site');
    site.value = querySite || resolvedSite;
    // multisite end


    // personalize in progress
    const personalizeService = new GraphQLPersonalizeService({
      endpoint: runtimeConfig.public.graphQLEndpoint,
      apiKey: runtimeConfig.public.sitecoreApiKey,
      fetch: fetch,
    });
    // add CloudSDK logic if possible

    // rudimentary personalization - usually we'd get this from CloudSDK, but not CloudSDK with local dev 
    const variantId = useState('variantId', ()=> '');
    variantId.value = 'demo';
    console.log('end hybrid middleware');
    // personalize end
    return;
  })
