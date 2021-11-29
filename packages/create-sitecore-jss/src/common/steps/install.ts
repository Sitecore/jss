import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { run } from '../utils/cmd';

/**
 * @param {string} projectFolder
 */
export function installPackages(projectFolder: string) {
  console.log(chalk.cyan('Installing packages...'));

  const lernaPath = path.join(projectFolder, '..', '..');

  if (fs.existsSync(path.join(lernaPath, 'lerna.json'))) {
    console.log(chalk.yellow('Detected development environment. '));

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
}
