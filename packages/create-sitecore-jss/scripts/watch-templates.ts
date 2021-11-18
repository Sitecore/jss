import chokidar from 'chokidar';
import path from 'path';
import parseArgs, { ParsedArgs } from 'minimist';
import { NextjsInitializer } from '../src/initializers/nextjs/index';

chokidar
  .watch(path.join(process.cwd(), '.\\src\\templates'), { ignoreInitial: true })
  .on('add', callback)
  .on('change', callback)
  .on('unlink', callback)
  .on('ready', callback);

// TODO: logs here for ready and pathname
// TODO: detect inititializer based on path (e.g. path.startsWith('nextjs'))
// TODO: feed args from json config file (i.e. watch.json)

function callback() {
  const args: ParsedArgs = parseArgs([
    '--force',
    '--silent',
    '--appName',
    'test',
    '--destination',
    '..\\..\\samples\\test',
    '--fetchWith',
    'GraphQL',
    '--prerender',
    'SSG',
    '--hostName',
    'https://cm.jss.localhost',
  ]);
  new NextjsInitializer().init(args);
}
