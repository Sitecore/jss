import chalk from 'chalk';
import del from 'del';
import fsExtra, { CopyOptionsSync } from 'fs-extra';
import path from 'path';

export interface DeployOptions {
  sourcePath: string;
  destinationPath: string;
  excludeFile?: string | string[];
  clean?: boolean;
}

/**
 * @param {DeployOptions} options
 */
export function deploy(options: DeployOptions) {
  let createdDestination = false;

  if (!fsExtra.existsSync(options.destinationPath)) {
    console.log(`Creating nonexistant destination path ${chalk.green(options.destinationPath)}...`);
    createdDestination = true;
    fsExtra.ensureDirSync(options.destinationPath);
  }

  const copyOptions: CopyOptionsSync = {};
  if (options.excludeFile) {
    if (typeof options.excludeFile === 'string') {
      copyOptions.filter = (src: string) => {
        const result = path.basename(src).indexOf(options.excludeFile as string) === -1;
        if (!result) {
          console.log(
            `Ignored ${chalk.yellow(src)} (${path.basename(src)}) due to exclusion.`,
            options.excludeFile
          );
        }
        return result;
      };
    }

    if (options.excludeFile && options.excludeFile instanceof Array) {
      copyOptions.filter = (src: string) => {
        const fileName = path.basename(src);

        const result = (options.excludeFile as string[]).indexOf(fileName) === -1;

        if (!result) {
          console.log(
            `Ignored ${chalk.yellow(src)} (${path.basename(src)}) due to exclusion.`,
            options.excludeFile
          );
        }

        return result;
      };
    }
  }

  if (options.clean && !createdDestination) {
    console.log(`Cleaning existing files from ${chalk.green(options.destinationPath)}...`);
    // delete the destination path's items but leave the directory alone
    del.sync([`${options.destinationPath}/**`, `!${options.destinationPath}`], { force: true });
  }

  console.log(
    `Copying ${chalk.green(options.sourcePath)} to ${chalk.green(options.destinationPath)}...`
  );
  fsExtra.copySync(options.sourcePath, options.destinationPath, copyOptions);

  console.log();
  console.log(chalk.green('JSS app build artifacts have been deployed to Sitecore.'));
}
