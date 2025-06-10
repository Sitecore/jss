import {
  validateDeployContext,
  validateConsent,
  ExtractedFileType,
  resolveComponentImportFiles,
  sendCode,
} from './utils';
import { fetchBearerToken } from '../auth/fetch-bearer-token';
import chalk from 'chalk';
import path from 'path';
import { debug } from '@sitecore-jss/sitecore-jss';

type ExtracFilesOptions = {
  componentBuilderPath?: string;
  customValidateDeployContext?: () => boolean;
};

/**
 * Handler for the extract-component API command
 * Reads imports from the componentBuilder.ts file and posts the code to the mesh endpoint
 * @param {ExtracFilesOptions} [args] - The options for code extraction
 * @returns {Promise<void>} void
 */
export async function extractFiles(args: ExtracFilesOptions = {}) {
  if (
    (args.customValidateDeployContext && !args.customValidateDeployContext()) ||
    !validateDeployContext()
  ) {
    debug.common('Skipping code extraction, not in deploy context');
    return;
  }
  if (!validateConsent()) {
    console.log(chalk.yellow('Skipping code extraction, consent not given'));
    return;
  }
  console.log(chalk.green('Code extraction started'));
  const basePath = process.cwd();

  try {
    const token = await fetchBearerToken();
    if (!token) {
      console.error(chalk.red('Failed to get bearer token, aborting code extraction'));
      return;
    }

    const componentPaths = await resolveComponentImportFiles(basePath, args.componentBuilderPath);

    const fileDispatches = Array.from(componentPaths, (mapEntry) =>
      sendCode(
        {
          name: mapEntry[0],
          path: mapEntry[1],
          type: ExtractedFileType.Component,
        },
        token
      )
    );

    fileDispatches.push(
      sendCode(
        {
          name: 'package.json',
          path: path.resolve(basePath, './package.json'),
          type: ExtractedFileType.PackageJson,
        },
        token
      )
    );

    const files = await Promise.all(fileDispatches);
    console.log(
      chalk.green(
        `Code extraction completed successfully, files extracted:\r\n${files
          .filter((file) => file !== null)
          .join('\r\n')}`
      )
    );
  } catch (error) {
    console.error(chalk.red('Error during code extraction:', error));
  }
}
