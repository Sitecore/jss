import chalk from 'chalk';
import chokidar from 'chokidar';
import path from 'path';
import { initRunner } from '../src/init-runner';
const execSync = require('child_process').execSync;

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

const initializeApps = async (noInstall: boolean) => {
  let watch;
  try {
    watch = await import(path.resolve('watch.json'));
    const initializers = watch.initializers || [];
    await initRunner(initializers, { ...watch.args, templates: initializers, noInstall });
    if (watch.args.restoreLockfile) {
      restoreLockfile();
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
