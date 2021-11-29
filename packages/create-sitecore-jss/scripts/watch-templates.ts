import chalk from 'chalk';
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import watch from '../watch.json';
import { ParsedArgs } from 'minimist';
import { InitializerFactory } from '../src/InitializerFactory';

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
  const initializers = watch.initializers || [];
  if (fs.existsSync(path.resolve(args.destination, 'node_modules'))) {
    args.initialized = true;
  }
  for (const initializer of initializers) {
    const init = new InitializerFactory().create(initializer);
    if (!init) {
      console.error(chalk.red(`Unsupported template '${initializer}'`));
      process.exit(1);
    }
    try {
      init?.init(args);
    } catch (error) {
      console.log(chalk.red('An error occurred: ', error));
    }
  }
}
