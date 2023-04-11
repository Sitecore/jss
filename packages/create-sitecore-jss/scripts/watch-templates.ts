import { execSync, exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';

import { initRunner } from '../src/init-runner';

chokidar
  .watch(path.join(process.cwd(), '.\\src\\templates'), { ignoreInitial: true })
  .on('ready', () => ready())
  .on('all', (event, path) => callback(event, path));

/**
 * Initializes the apps.
 */
async function ready() {
  console.log(chalk.green('Initializing app...'));
  await initializeApps(false);
  console.log(chalk.green('Initializing app complete. Watching for changes...'));
}

/**
 * Callback for chokidar.
 * @param {string} event - The event that occurred.
 * @param {string} path - The path of the file that was changed.
 */
async function callback(event?: string, path?: string) {
  const color = event === 'add' ? chalk.green : event === 'unlink' ? chalk.red : chalk.white;
  console.table(color(`${event} ${path}`));
  await initializeApps(true);
}

/**
 * restore dependencies added to yarn.lock file post initializing a sample app using the watch script.
 * this is necessary so that these dependencies dont get committed to the source control.
 */
function restoreLockfile() {
  const output = execSync('git status', { encoding: 'utf-8' });
  if (output.includes('yarn.lock')) {
    execSync('git restore ../../yarn.lock', { encoding: 'utf-8' });
  }
}

/**
 * Removes and then regenerates the yarn.lock file in order to resolve conflicting dependencies for react template.
 */
async function regenerateYarnLock() {
  const yarnLockPath = path.join(__dirname, '..', '..', '..', 'yarn.lock');
  const rootPath = path.join(__dirname, '..', '..', '..');

  console.log(chalk.yellow('Wait until yarn.lock is regenerated...'));

  try {
    // Remove yarn.lock
    await fs.unlink(yarnLockPath, (err: Error) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(chalk.red('yarn.lock was removed.'));
    });

    // Re-install dependencies
    await promisify(exec)('yarn install', { cwd: rootPath });
    // Dependencies installed successfully
    console.log(chalk.green('yarn.lock generated successfully.'));
  } catch (err) {
    console.error(err);
  }
}

const initializeApps = async (noInstall: boolean) => {
  let watch;
  try {
    watch = await import(path.resolve('watch.json'));
    const initializers = watch.initializers || [];
    await initRunner(initializers, { ...watch.args, templates: initializers, noInstall });
    if (watch.args.restoreLockfile) {
      restoreLockfile();
    }
    if (initializers.includes('react')) {
      await regenerateYarnLock();
    }
  } catch (error) {
    console.log(chalk.red('An error occurred: ', error));
    if (!watch) {
      console.log(
        chalk.red('Could not find config. Did you create a watch.json file at the root?')
      );
      process.exit(1);
    }
  }
};
