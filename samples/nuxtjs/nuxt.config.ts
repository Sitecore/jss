import tsconfigPaths from 'vite-tsconfig-paths';
import graphqlLoader from 'vite-plugin-graphql-loader';
import { sitemapFetcher } from 'lib/sitemap-fetcher/index';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    cdnURL: 'http://localhost:3000',
  },
  // this is not needed really - but it allows combining server-only and client-only components on page
  experimental: {
    componentIslands: true,
  },
  ssr: true,
  modules: ['@nuxtjs/i18n'], // todo: add '@nuxtjs/eslint-module' to run lint during build
  // https://i18n.nuxtjs.org/getting-started/basic-usage
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  devtools: { enabled: true },
  // runtimeConfig is available throught the app. Public props are available both client and server side
  // We can consider replacing our temp/config with this
  runtimeConfig: {
    sitecoreApiHost: process.env.NUXT_SITECORE_API_HOST,
    sitecoreSiteName: process.env.NUXT_SITECORE_SITE_NAME,
    sitecoreApiKey: process.env.NUXT_SITECORE_API_KEY,
    layoutServiceConfigurationName: process.env.NUXT_LAYOUT_SERVICE_CONFIGURATION_NAME,
    graphQLEndpoint: `${process.env.NUXT_SITECORE_API_HOST}/sitecore/api/graph/edge`,
    public: {
      sitecoreSiteName: process.env.NUXT_SITECORE_SITE_NAME,
      sitecoreApiKey: process.env.NUXT_SITECORE_API_KEY,
      graphQLEndpoint: `${process.env.NUXT_SITECORE_API_HOST}/sitecore/api/graph/edge`,
      sites: [],
    },
  },
  nitro: {
    prerender: {
      // enabled by default with nuxt generate, not required
      crawlLinks: false,
      // add any routes to prerender
      routes: ['/en']
    }
  },
  vite: {
    // tsconfigPaths for resolving modules correctly
    // graphQLLoader to make GraphQL page components work (currently does not really work :-( )
    plugins: [tsconfigPaths(), graphqlLoader()],
    hooks: {
      'vite:extendConfig'(config, { isServer }) {
        if (isServer) {
          delete config.define!['typeof document'];
        }
      },      
    },
    // Nuxt app would not build due to CJS dependencies without these and vite:extendConfig configurations
    // It might work if we remove them - but I'm too scared to find out right now
    build: {
      publicPath: 'http://localhost:3000',
      transpile: ['memory-cache'],
      commonjsOptions: {
        include: [
          /memory-cache/,
          /@sitecore-jss\/sitecore-jss/,
          /@sitecore-jss\/sitecore-jss\/personalize/,
          /node_modules/,
          /@sitecore-jss\/sitecore-jss-vue/,
        ],
      },
    },
    optimizeDeps: {
      include: ['memory-cache', '@sitecore-jss/sitecore-jss-vue', '@sitecore-jss/sitecore-jss'],
    },
  },
});
