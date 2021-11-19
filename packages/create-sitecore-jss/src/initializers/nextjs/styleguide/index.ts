import path from 'path';
import { Initializer } from '../../../initializers';
import { ParsedArgs } from 'minimist';
import { openPackageJson, transformFiles } from '../../../shared';

export class StyleguideInitializer implements Initializer {
  async init(args: ParsedArgs) {
    // read the package.json to get the appName
    const pkg = openPackageJson();

    args.appName = pkg.config.appName;
    args.destination = path.resolve(process.cwd());
    args.appPrefix = pkg.config.prefix || args.appPrefix || false;
    
    // TODO: check diff and ask permission before overwrite
    const templatePath = path.resolve(__dirname, '../../../templates/nextjs/styleguide');
    await transformFiles(templatePath, args);
  }
}
