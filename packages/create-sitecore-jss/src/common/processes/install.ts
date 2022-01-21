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
        stdio: 'pipe',
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
  run('npm', ['run', 'lint', '--', '--fix'], { cwd: projectFolder, encoding: 'utf8' });
};
