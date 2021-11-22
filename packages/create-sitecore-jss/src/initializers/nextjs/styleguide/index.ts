import path from 'path';
import { Initializer } from '../../../models';
import { ParsedArgs } from 'minimist';
import { openPackageJson, transformFiles, writePackageJson } from '../../../shared';
import chalk from 'chalk';

export class StyleguideInitializer implements Initializer {
  async init(args: ParsedArgs) {

    const props = {
      dependencies: {
        "bootstrap": "^4.3.1",
        "nprogress": "~0.2.0",
      },
      devDependencies: {
        "@sitecore-jss/sitecore-jss-dev-tools": "^20.0.0-canary",
      },
      scripts: {
        "start": "cross-env-shell JSS_MODE=disconnected \"npm-run-all --serial bootstrap --parallel next:dev start:disconnected-proxy start:watch-components\"",
      },
    }
    // read the package.json to get the appName
    const pkg = openPackageJson();
    
    args.appName = pkg.config.appName;
    args.destination = path.resolve(process.cwd());
    args.appPrefix = pkg.config.prefix || args.appPrefix || false;
    
    writePackageJson(pkg, props);

    
    // TODO: check diff and ask permission before overwrite
    const templatePath = path.resolve(__dirname, '../../../templates/nextjs/styleguide');
    await transformFiles(templatePath, args);

    console.log(chalk.green(`Successfully added styleguide to ${args.appName}!`));
  }
}
