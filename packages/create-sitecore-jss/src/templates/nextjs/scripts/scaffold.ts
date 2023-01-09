/* eslint-disable @typescript-eslint/no-var-requires */
import { scaffoldCommand } from './scaffold/components';
const { program } = require('commander');

program
  .command('component')
  .description('create template files for components')
  .argument('[component-name]')
  .action((componentName: string) => {
    scaffoldCommand(componentName);
  });

program.parse(process.argv);
