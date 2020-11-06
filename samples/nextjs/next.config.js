const jssConfig = require('./src/temp/config');

const disconnectedServerUrl = `http://localhost:${process.env.DISCONNECTED_SERVER_PORT || 3042}/`;
const disconnected = process.env.JSS_MODE === 'disconnected';

module.exports = (phase) => {
  
  const env = {
    // Expose current Next.js phase as an environment variable
    // See available phases here: https://github.com/vercel/next.js/blob/canary/packages/next/next-server/lib/constants.ts#L1-L4
    NEXT_PHASE: phase
  }

  const i18n = {
    locales: ['en', 'da-DK'],
    defaultLocale: 'en'
  }

  async function rewrites() {
    if (disconnected) {
      // When disconnected we proxy to the local faux layout service host, see scripts/disconnected-mode-server.js
      return [
        {
          source: '/sitecore/:path*',
          destination: `${disconnectedServerUrl}/sitecore/:path*`,
        },
        // media items
        {
          source: '/data/media/:path*',
          destination: `${disconnectedServerUrl}/data/media/:path*`,
        },
      ]
    } else {
      // When in connected mode we want to proxy Sitecore paths off to Sitecore
      return [
        {
          source: '/sitecore/:path*',
          destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
        },
        // media items
        {
          source: '/-/:path*',
          destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
        },
        // visitor identification
        {
          source: '/layouts/:path*',
          destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
        },
      ]
    }
  }

  return {
    env,
    i18n,
    rewrites
  };
};