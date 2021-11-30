import chalk from 'chalk';
import path from 'path';
import { ParsedArgs } from 'minimist';
import { Initializer } from '../../../common/Initializer';
import { Answer } from '../../../common/Answer';
import { isJssApp, openPackageJson } from '../../../common/utils/helpers';
import { transform, lintFix } from '../../../common/steps/index';

export class NextjsStyleguideInitializer implements Initializer {
  async init(args: ParsedArgs) {
    // set destination to cwd, or read from args
    args.destination = args.destination || path.resolve(process.cwd());
    args.post = true;

    let pkg;
    // read package.json in target destination, check if app is JSS app
    if (!args.yes) {
      pkg = openPackageJson(`${args.destination}\\package.json`);
      isJssApp('nextjs-styleguide', pkg);
    }

    // derive variables from package.json
    // read the package.json to get the appName
    args.appName = args.appName || pkg?.config.appName || 'default';
    args.appPrefix = args.appPrefix || pkg?.config?.prefix || false;
    const templatePath = path.resolve(__dirname, '../../../templates/nextjs/styleguide');
    await transform(templatePath, (args as unknown) as Answer);

    if (!args.silent) {
      console.log(chalk.green(`Successfully added styleguide to ${args.appName}!`));
    }
    lintFix(args.destination);
  }
}
