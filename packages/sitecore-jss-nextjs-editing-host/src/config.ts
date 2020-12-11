import { URL } from 'url';
import chalk from 'chalk';

const NEXT_IMAGE_PATH = '/_next/image';
const NEXT_DEFAULT_DIST_DIR = '.next';

function getPublicUrl(): URL {
  let url = process.env.PUBLIC_URL;
  if (url === undefined) {
    console.warn(`${chalk.yellow.bold('Warning:')} A PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.`);
    url = 'http://localhost:3000';
  } else {
    try {
      new URL(url);
    } catch (error) {
      console.warn(`${chalk.yellow.bold('Warning:')} The PUBLIC_URL environment variable '${url}' is not a valid URL. Falling back to http://localhost:3000.`);
      url = 'http://localhost:3000';
    }
  }
  return new URL(url);
}

export interface ConfigOptions {
  enabled?: boolean;
  distDir?: string;
}

/**
 * Editing host configuration for next.config.js as a Next.js "plugin"
 * See https://github.com/vercel/next-plugins
 * @param {ConfigOptions} [options] Configuration options
 */
export function config({
  enabled = false,
  distDir = '.next-editing',
}: ConfigOptions = {}) {
  return function plugin(nextConfig: any = {}) {
    if (!enabled) {
      return nextConfig;
    }

    const primaryDistDir = nextConfig.distDir ?? NEXT_DEFAULT_DIST_DIR;
    if (distDir === primaryDistDir) {
      throw new Error(`The editing 'distDir' (${distDir}) can not be the same as the primary 'distDir' (${primaryDistDir})`);
    }

    console.info(`${chalk.cyan('info')}  - Applying editing host configuration`);

    const publicUrl = getPublicUrl();

    return Object.assign({}, nextConfig, {
      // Set our public URL as the asset prefix, which is used by Next.js for the JavaScript and CSS files it loads
      // See https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
      assetPrefix: publicUrl.toString().replace(/\/$/, ''),
      // Use dedicated build directory (main app uses '.next')
      distDir,
      // Set our public URL to be used by Next.js image optimization
      // See https://nextjs.org/docs/basic-features/image-optimization
      images: {
        domains: (nextConfig?.images?.domains ?? []).concat(publicUrl.hostname),
        path: new URL(NEXT_IMAGE_PATH, publicUrl).toString().replace(/\/$/, ''),
      },
    });
  };
}
