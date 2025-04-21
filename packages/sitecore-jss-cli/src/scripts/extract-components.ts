import {
  fetchBearerToken,
  resolveComponentImportFiles,
  sendCode,
} from '@sitecore-jss/sitecore-jss-dev-tools';
import chalk from 'chalk';
import path from 'path';
import { Argv } from 'yargs';

/**
 * @param {Argv} yargs
 */
export function args(yargs: Argv) {
  return yargs
    .option('environment', {
      requiresArg: false,
      type: 'string',
      describe: 'Environment to authenticate into. Default: prod',
    })
    .option('appFolder', {
      requiresArg: false,
      type: 'string',
      describe: 'Path to app folder to get components from. Default: current folder',
    });
}

/**
 * @param {Argv} yargs
 */
export default function builder(yargs: Argv) {
  return yargs.command(
    'extract-components',
    'Reads component files and posts their code for AI learning',
    args,
    handler
  );
}

/**
 * Handler for the extract-component API command
 * Reads imports from the componentBuilder.ts file and posts the code to the mesh endpoint
 * @param {object} args - The arguments passed to the command, with optional appName string
 * @returns {Promise<void>} void
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(args: any) {
  // TODO: add alternative consent procedure when refining later
  if (!process.env.EXTRACT_CONSENT) {
    console.log(chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set'));
    return;
  }
  if (!isBuildContext()) {
    console.log(chalk.yellow('Skipping code extraction, not in build context'));
    return;
  }
  const basePath = args.appFolder ? resolveAppPath(args.appFolder) : process.cwd();
  try {
    const bearer = await fetchBearerToken();
    if (!bearer) {
      console.error(chalk.red('Failed to get bearer token, aborting code extraction'));
      return;
    }

    const componentPaths = await resolveComponentImportFiles(basePath);

    const codeDispatches = Array.from(componentPaths, (mapEntry) =>
      sendCode(mapEntry[0], mapEntry[1], bearer)
    );

    Promise.all(codeDispatches);
  } catch (error) {
    console.error(chalk.red('Error during component extraction:', error));
  }
}

const resolveAppPath = (appFolder: string) => {
  if (path.isAbsolute(appFolder)) return appFolder;
  return path.resolve(process.cwd(), appFolder);
};

const isBuildContext = () => {
  if (process.env.NETLIFY && process.env.BUILD_ID) {
    return true;
  }
  // workaround, Vercel does not have variables that are only accessible at build time
  if (process.env.VERCEL && !process.env.VERCEL_REGION) {
    return true;
  }
  if (process.env.XMCLOUD) {
    return true;
  }
  return false;
};
