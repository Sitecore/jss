import chalk from 'chalk';
import path from 'path';
import { ParsedArgs } from 'minimist';
import { Initializer } from '../../../models';
import { openPackageJson, transformFiles } from '../../../shared';

export class StyleguideInitializer implements Initializer {
  async init(args: ParsedArgs) {
    // read the package.json to get the appName
    const pkg = openPackageJson();

    // derive variables from package.json and cwd
    args.appName = pkg.config.appName;
    args.destination = path.resolve(process.cwd());
    args.appPrefix = pkg.config.prefix || args.appPrefix || false;

    const templatePath = path.resolve(__dirname, '../../../templates/nextjs/styleguide');
    await transformFiles(templatePath, args);

    console.log(chalk.green(`Successfully added styleguide to ${args.appName}!`));
  }
}
