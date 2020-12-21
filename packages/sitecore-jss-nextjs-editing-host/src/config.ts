import chalk from 'chalk';
import { getPublicUrl } from './util';

const NEXT_IMAGE_PATH = '/_next/image';
const NEXT_DEFAULT_DIST_DIR = '.next';

export interface ConfigOptions {
  /**
   * Enable the configuration (e.g. based on process.env.JSS_MODE).
   * @default false
   */
  enabled?: boolean;
  /**
   * The build directory. This should be different than your primary Next.js 'distDir' ('.next' by default).
   * @default '.next-editing'
   */
  distDir?: string;
}

/**
 * Editing host configuration for next.config.js as a Next.js "plugin"
 * See https://github.com/vercel/next-plugins
 * @param {ConfigOptions} [options] Configuration options
 * @returns {ConfigOptions} config
 */
export function config({ enabled = false, distDir = '.next-editing' }: ConfigOptions = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function plugin(nextConfig: any = {}) {
    if (!enabled) {
      return nextConfig;
    }

    const primaryDistDir = nextConfig.distDir ?? NEXT_DEFAULT_DIST_DIR;
    if (distDir === primaryDistDir) {
      throw new Error(
        `The editing 'distDir' (${distDir}) can not be the same as the primary 'distDir' (${primaryDistDir})`
      );
    }

    console.info(`${chalk.cyan('info')}  - Applying editing host configuration`);

    const publicUrl = getPublicUrl();

    return Object.assign({}, nextConfig, {
      // Set our public URL as the asset prefix, which is used by Next.js for the JavaScript and CSS files it loads
      // See https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
      assetPrefix: publicUrl,

      // Use dedicated build directory (main app uses '.next')
      distDir,

      // Set our public URL to be used by Next.js image optimization
      // See https://nextjs.org/docs/basic-features/image-optimization
      images: {
        domains: (nextConfig?.images?.domains ?? []).concat(new URL(publicUrl).hostname),
        path: new URL(NEXT_IMAGE_PATH, publicUrl).toString().replace(/\/$/, ''),
      },

      // Make our public URL available as an environment variable key
      env: {
        publicUrl,
      },
    });
  };
}
