import chokidar from 'chokidar';
import path from 'path';
import { ParsedArgs } from 'minimist';
import { NextjsInitializer } from '../src/initializers/nextjs/index';

// TODO: detect initializer and args based on config file.

// TODO - add yes flag on npm init

import watch from './../watch.json';
chokidar
  .watch(path.join(process.cwd(), '.\\src\\templates'), { ignoreInitial: true })
  .on('ready', () => console.log('Initial scan complete. Ready for changes...'))
  .on('all', (event, path) => callback(event, path));

/**
 * @param event
 * @param path
 */
function callback(event: string, path: string) {
  console.table(`${event} ${path}`);

  const args: ParsedArgs = { ...watch.args, '--': undefined, _: [] };

  const init = watch.initializers || [];
  init.forEach((initializer) => {
    switch (initializer) {
      case 'nextjs':
        new NextjsInitializer().init(args);
        break;
      default:
        console.log(`Initializer ${initializer} not found.`);
    }
  });
}
