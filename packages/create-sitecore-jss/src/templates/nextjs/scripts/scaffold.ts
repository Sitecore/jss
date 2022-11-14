const { program } = require('commander');
import { scaffoldCommand } from './scaffold/components';

program
  .command('component')
  .description('create template files for components')
  .argument('[component-name]')
  .action((componentName: string) => {
    scaffoldCommand(componentName);
  });

program.parse(process.argv);
