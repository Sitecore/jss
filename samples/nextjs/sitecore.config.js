import packageJson from 'package.json';
import sites from 'temp/sites';

const config = {
  middleware: {
    multisite: {},
    personalize: {},
    redirects: {},
  },
  client: {
    xmcloud: {
      sitecoreEdgeUrl: process.env.SITECORE_EDGE_CONTEXT_ID,
      sitecoreEdgeContextId: process.env.SITECORE_EDGE_URL,
    },
  },
  sitecoreSiteName: process.env.SITECORE_SITE_NAME || packageJson.name,
  jssEditingSecret: process.env.JSS_EDITING_SECRET,
  // can be readonly?
  sites: sites,
};

export default config;
