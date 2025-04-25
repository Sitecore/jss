import { ExtractedFileType, resolveComponentImportFiles, sendCode } from './utils';
import { fetchBearerToken } from '../auth/fetch-bearer-token';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

type ExtractComponentArgs = {
  appFolder?: string;
  componentBuilderPath?: string;
};

/**
 * Handler for the extract-component API command
 * Reads imports from the componentBuilder.ts file and posts the code to the mesh endpoint
 * @param {object} args - The arguments passed to the command, with optional appName string
 * @returns {Promise<void>} void
 */
export async function extractComponents(args: ExtractComponentArgs) {
  if (!isDeployContext()) {
    console.log(chalk.yellow('Skipping code extraction, not in deploy context'));
    return;
  }
  // TODO: add alternative consent procedure when refining later
  if (!process.env.EXTRACT_CONSENT) {
    console.log(chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set'));
    return;
  }
  const basePath = args.appFolder ? parsePath(args.appFolder) : process.cwd();
  if (!fs.existsSync(path.resolve(basePath))) {
    console.error(chalk.red('Skipping code extraction, no app folder found at ', basePath));
    return;
  }
  try {
    const bearer = await fetchBearerToken();
    if (!bearer) {
      console.error(chalk.red('Failed to get bearer token, aborting code extraction'));
      return;
    }

    const componentPaths = await resolveComponentImportFiles(basePath, args.componentBuilderPath);

    const codeDispatches = Array.from(componentPaths, (mapEntry) =>
      sendCode(
        {
          name: mapEntry[0],
          path: mapEntry[1],
          type: ExtractedFileType.Component,
        },
        bearer
      )
    );

    await Promise.all(codeDispatches);
  } catch (error) {
    console.error(chalk.red('Error during component extraction:', error));
  }
}

const parsePath = (input: string) => {
  if (path.isAbsolute(input)) return input;
  return path.resolve(process.cwd(), input);
};

const isDeployContext = () => {
  if (process.env.NETLIFY && process.env.BUILD_ID) {
    return true;
  }
  // workaround, Vercel does not have variables that are only accessible at build time
  if (process.env.VERCEL && !process.env.VERCEL_REGION) {
    return true;
  }
  if (process.env.SITECORE && process.env.BuildMetadata_BuildId) {
    return true;
  }
  return false;
};
