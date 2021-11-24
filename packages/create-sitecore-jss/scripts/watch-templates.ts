import chokidar from 'chokidar';
import path from 'path';
import { ParsedArgs } from 'minimist';
import { NextjsInitializer } from '../src/initializers/nextjs/index';
import chalk from 'chalk';
import fs from 'fs';

import watch from '../watch.json';
chokidar
  .watch(path.join(process.cwd(), '.\\src\\templates'), { ignoreInitial: true })
  .on('ready', () => ready())
  .on('all', (event, path) => callback(event, path));

/**
 *
 */
async function ready() {
  console.log(chalk.green('Initializing app...'));
  await initializeApps();
  watch.args.initialized = true;
  console.log(chalk.green('Initializing app complete. Watching for changes...'));
}

/**
 * @param event
 * @param path
 */
async function callback(event?: string, path?: string) {
  const color = event === 'add' ? chalk.green : event === 'unlink' ? chalk.red : chalk.white;
  console.table(color(`${event} ${path}`));
  await initializeApps();
}

/**
 *
 */
async function initializeApps() {
  const args: ParsedArgs = { ...watch.args, '--': undefined, _: [] };
  const init = watch.initializers || [];
  if (fs.existsSync(path.resolve(args.destination, 'node_modules'))) {
    args.initialized = true;
  }
  for (const initializer of init) {
    switch (initializer) {
      case 'nextjs':
        await new NextjsInitializer().init(args);
        break;
      default:
        console.error(chalk.red(`Initializer ${initializer} not found.`));
    }
  }
}
