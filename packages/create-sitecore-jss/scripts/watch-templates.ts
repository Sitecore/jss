import chokidar from 'chokidar';
import path from 'path';
import parseArgs, { ParsedArgs } from 'minimist';
import { NextjsInitializer } from '../src/initializers/nextjs/index';
import { initializerType } from './../utils';

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
  const initializer = initializerType
    .map((item: string) => path.includes(item) && item)
    .filter(Boolean)[0];
  console.log(initializer);

  console.table(`${event} ${path}`);

  const args: ParsedArgs = parseArgs(watch.args);

  new NextjsInitializer().init(args);
}
