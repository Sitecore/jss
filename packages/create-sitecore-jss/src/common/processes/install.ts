import { exec } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { run } from '../utils/cmd';
import { isDevEnvironment, openJsonFile } from '../utils/helpers';

/**
 * Executes packages installation, depending on the environment
 * @param {string} projectFolder path to the app folder
 * @param {boolean} [silent] suppress logs
 */
export const installPackages = (projectFolder: string, silent?: boolean) => {
  silent || console.log(chalk.cyan('Installing packages...'));

  if (isDevEnvironment(projectFolder)) {
    silent || console.log(chalk.yellow('Detected development environment.'));

    run(
      'yarn',
      ['install'],
      {
        cwd: projectFolder,
        encoding: 'utf8',
      },
      silent
    );
  } else {
    run(
      'npm',
      ['install'],
      {
        cwd: projectFolder,
        encoding: 'utf8',
      },
      silent
    );
  }
};

/**
 * Fixes possible linting issues
 * @param {string} projectFolder path to the app folder
 * @param {boolean} [silent] suppress logs
 */
export const lintFix = (projectFolder: string, silent?: boolean) => {
  const pkg = getPackageJson(projectFolder);
  if (!pkg?.scripts?.lint) {
    return;
  }

  silent || console.log(chalk.cyan('Linting app...'));
  run(
    'npm',
    ['run', 'lint', '--', '--fix'],
    {
      cwd: projectFolder,
      encoding: 'utf8',
    },
    silent
  );
};

/**
 * Install pre-push hook for lint check
 * @param {string} destination path to the app folder
 * @param {boolean} [silent] suppress logs
 */
export const installPrePushHook = async (destination: string, silent?: boolean) => {
  const pkg = getPackageJson(destination);
  if (!pkg?.scripts || !pkg.scripts['install-pre-push-hook']) {
    return;
  }

  silent || console.log(chalk.cyan('Installing pre-push hook...'));
  await new Promise<void>((resolve, reject) => {
    exec(`cd ${destination} && git init && npm run install-pre-push-hook`, (err) => {
      if (err) {
        console.log(chalk.yellow(`Warning: Pre-push hook may not be working due to error ${err}`));
        reject(err);
      } else {
        silent || console.log(chalk.cyan('Pre-push hook installed successfully!'));
        resolve();
      }
    });
  });
};

const getPackageJson = (projectFolder: string) => {
  const packagePath = path.join(projectFolder, 'package.json');
  return openJsonFile(packagePath);
};
