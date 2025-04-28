import { ExtractedFileType, resolveComponentImportFiles, sendCode } from './utils';
import { fetchBearerToken } from '../auth/fetch-bearer-token';
import chalk from 'chalk';

type ExtractComponentOptions = {
  componentBuilderPath?: string;
};

/**
 * Handler for the extract-component API command
 * Reads imports from the componentBuilder.ts file and posts the code to the mesh endpoint
 * @param {ExtractComponentOptions} args - The arguments passed to the command, with optional appName string
 * @returns {Promise<void>} void
 */
export async function extractComponents(args: ExtractComponentOptions = {}) {
  if (!isDeployContext()) {
    console.log(chalk.yellow('Skipping code extraction, not in deploy context'));
    return;
  }
  // TODO: add alternative consent procedure when refining later
  if (!process.env.EXTRACT_CONSENT) {
    console.log(chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set'));
    return;
  }

  const basePath = process.cwd();

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
