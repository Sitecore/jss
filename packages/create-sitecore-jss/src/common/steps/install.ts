import chalk from 'chalk';
import { run } from '../utils/cmd';
import { isDevEnvironment } from '../utils/helpers';

/**
 * @param {string} projectFolder
 * @param {boolean} [silent]
 */
export const installPackages = (projectFolder: string, silent?: boolean) => {
  silent || console.log(chalk.cyan('Installing packages...'));

  if (isDevEnvironment(projectFolder)) {
    silent || console.log(chalk.yellow('Detected development environment.'));

    run('yarn', ['workspaces', 'focus', '--all'], {
      cwd: projectFolder,
      encoding: 'utf8',
    });
  } else {
    run('npm', ['install'], {
      cwd: projectFolder,
      encoding: 'utf8',
    });
  }
};

/**
 * @param {string} projectFolder
 * @param {boolean} [silent]
 */
export const lintFix = (projectFolder: string, silent?: boolean) => {
  silent || console.log(chalk.cyan('Linting app...'));
  run('npm', ['run', 'lint', '--', '--fix'], { cwd: projectFolder, encoding: 'utf8' });
};
