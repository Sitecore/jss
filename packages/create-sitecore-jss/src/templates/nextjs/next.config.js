const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = getPublicUrl();

const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,

  // enable image provider domains and device sizes
  images: {
    // We use a custom loader function in the NextImage component (passed to next/image).
    // See: https://nextjs.org/docs/api-reference/next/image#loader
    // The config here is more of a vanity configuration as it does not affect the functionality, but is recommended by Vercel.
    loader: 'custom',
    // IMPORTANT: 'path' is required as this drives our custom loader when media URLs are relative.
    path: jssConfig.sitecoreApiHost,
    // deviceSizes - If you know the expected device widths of your users, you can specify a list of device width breakpoints.
    // These widths are used when the next/image component uses layout="responsive" or layout="fill" to ensure the correct image is served for user's device.
    // It is used to generate the srcset attribute for the image, using two sizes 300 and 100px max widths, respecting aspect ratio.
    // IMPORTANT: These sizes should match your Sitecore server-side allowlist. See /sitecore/config/*.config (search for 'allowedMediaParams')
    deviceSizes: [100, 300],
  },

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/system/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/system/:path*`,
      },
    ];
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
}
