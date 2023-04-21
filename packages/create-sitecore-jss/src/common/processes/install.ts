import { exec } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { run } from '../utils/cmd';
import { isDevEnvironment, openPackageJson } from '../utils/helpers';

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
  const packagePath = path.join(projectFolder, 'package.json');
  const pkg = openPackageJson(packagePath);
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
export const installPrePushHook = (destination: string, silent?: boolean) => {
  silent || console.log(chalk.cyan('Installing pre-push hook...'));

  exec(`cd ${destination} && git init && npm run install-pre-push-hook`, (err) => {
    if (err) {
      console.log(chalk.yellow(`Warning: Pre-push hook may not be working due to error ${err}`));
    }
  });
};
