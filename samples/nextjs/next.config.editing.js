const { parse } = require('url');
const chalk = require('chalk');
const { imageConfigDefault } = require('next/dist/next-server/server/image-config');

function getPublicUrl() {
  let url = process.env.PUBLIC_URL;
  if (!url || url.length === 0) {
    console.warn(chalk.yellow.bold('Warning: ') + 'A PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.')
    url = 'http://localhost:3000';
  }
  return url;
}

module.exports = ({ enabled = false, distDir = '.next-editing' } = {}) => (nextConfig = {}) => {
  if (!enabled) {
    return nextConfig;
  }

  const publicUrl = getPublicUrl();
  const domain = parse(publicUrl).hostname;

  // Set our public URL as the asset prefix, which is used by Next.js for the JavaScript and CSS files it loads
  // See https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
  nextConfig.assetPrefix = publicUrl;
  
  // Set our public URL to be used by Next.js image optimization
  // See https://nextjs.org/docs/basic-features/image-optimization
  nextConfig.images = nextConfig.images || {};
  nextConfig.images.domains = nextConfig.images.domains || [];
  nextConfig.images.domains.push(domain);
  nextConfig.images.path = publicUrl + imageConfigDefault.path;

  // Use dedicated build directory (main app uses '.next')
  nextConfig.distDir = distDir;

  return nextConfig;
}
