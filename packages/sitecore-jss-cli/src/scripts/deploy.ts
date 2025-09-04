/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Argv } from 'yargs';
import * as app from './deploy.app';
import component from './deploy.component';
import * as config from './deploy.config';
import * as files from './deploy.files';
import * as items from './deploy.items';
import * as pkg from './deploy.package';
import template from './deploy.template';

/**
 * @param {Argv} yargs
 */
export function builder(yargs: Argv) {
  return yargs
    .command({
      command: 'deploy',
      describe:
        'Deploys the JSS app artifacts to a Sitecore instance. Use `jss deploy --help` for subcommands.',
      builder: (innerYargs) => {
        innerYargs = innerYargs
          .command(config as any)
          .command(app as any)
          .command(files as any)
          .command(items as any)
          .command(pkg as any)
          .strict();

        innerYargs = component(innerYargs);
        innerYargs = template(innerYargs);

        return innerYargs;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler: () => {},
    })
    .demandCommand(2);
}
