import path from 'path';
import chalk from 'chalk';
import { run } from '../utils/cmd';
import { isDevEnvironment, openPackageJson } from '../utils/helpers';

/**
 * @param {string} projectFolder
 * @param {boolean} [silent]
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
      // TODO: remove `--legacy-peer-deps` when our samples have upgraded peer dependencies (strict since npm 7)
      ['install', '--legacy-peer-deps'],
      {
        cwd: projectFolder,
        encoding: 'utf8',
      },
      silent
    );
  }
};

/**
 * @param {string} projectFolder
 * @param {boolean} [silent]
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
