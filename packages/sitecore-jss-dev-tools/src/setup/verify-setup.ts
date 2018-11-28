import chalk from 'chalk';
import fs from 'fs';
import rlSync from 'readline-sync';
import { setup, userConfigPath } from './setup';

export const verifySetup = () => {
  if (!fs.existsSync(userConfigPath)) {
    console.warn(chalk.yellow(`No Sitecore connection has been configured (missing scjssconfig.json)`));
    // tslint:disable-next-line:max-line-length
    const runSetup = rlSync.keyInYN('This command requires a Sitecore connection. Would you like to configure the connection?');
    if (!runSetup) {
      // tslint:disable-next-line:no-string-throw
      throw 'This command cannot execute without a Sitecore connection';
    }

    setup(true);

    console.warn(chalk.yellow(`JSS app configuration must be deployed to Sitecore before continuing.`));
    console.warn(`Use ${chalk.green('jss deploy config')} or copy /sitecore/config/*.config manually to Sitecore's /App_Config/Include`);
    const continueCommand = rlSync.keyInYN(chalk.yellow('Is the config deployed?'));
    if (!continueCommand) {
      // tslint:disable-next-line:no-string-throw
      throw 'Retry this command after deploying your JSS app config to Sitecore.';
    }
  }
};
