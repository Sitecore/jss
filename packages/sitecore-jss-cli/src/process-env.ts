import path from 'path';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

/**
 * @param {string} dir The directory containing the .env files to load.
 */
export default function processEnv(dir: string) {
  // replicate Next.js handling/behavior
  // https://github.com/vercel/next.js/blob/v10.0.5/packages/next-env/index.ts#L80-L90
  const mode = process.env.NODE_ENV;
  const dotenvFiles = [
    `.env.${mode}.local`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    mode !== 'test' && '.env.local',
    `.env.${mode}`,
    '.env',
  ].filter(Boolean) as string[];

  // inspired by https://github.com/entropitor/dotenv-cli/blob/v4.0.0/cli.js#L53-L55
  dotenvFiles.forEach(function(env) {
    dotenvExpand(dotenv.config({ path: path.resolve(dir, env) }));
  });
}
