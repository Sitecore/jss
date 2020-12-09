import { parse } from 'url';
import chalk from 'chalk';
import { imageConfigDefault } from 'next/dist/next-server/server/image-config';

function getPublicUrl() {
  let url = process.env.PUBLIC_URL;
  if (!url || url.length === 0) {
    console.warn(`${chalk.yellow.bold('Warning:')} A PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.`);
    url = 'http://localhost:3000';
  }
  return url;
}

interface ConfigOptions {
  enabled?: boolean;
  distDir?: string;
}

/**
 * Editing host configuration for next.config.js as a Next.js "plugin"
 * See https://github.com/vercel/next-plugins
 * @param {ConfigOptions} options Configuration options
 */
export function config({
  enabled = false,
  distDir = '.next-editing',
}: ConfigOptions = {}) {
  return function plugin(nextConfig: any = {}) {
    if (!enabled) {
      return nextConfig;
    }

    console.info(`${chalk.cyan('info')}  - Applying editing host configuration`);

    const publicUrl = getPublicUrl();
    const domain = parse(publicUrl).hostname;

    return Object.assign({}, nextConfig, {
      // Set our public URL as the asset prefix, which is used by Next.js for the JavaScript and CSS files it loads
      // See https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
      assetPrefix: publicUrl,
      // Use dedicated build directory (main app uses '.next')
      distDir,
      // Set our public URL to be used by Next.js image optimization
      // See https://nextjs.org/docs/basic-features/image-optimization
      images: {
        domains: (nextConfig?.images?.domains ?? []).concat([ domain ]),
        path: publicUrl + imageConfigDefault.path,
      },
    });
  };
}
