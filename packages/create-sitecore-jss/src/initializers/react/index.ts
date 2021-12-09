import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { FetchWith } from '../../common/prompts/base';
import { ClientAppArgs } from '../../common/args/base';
import { ClientAppAnswer, clientAppPrompts } from '../../common/prompts/base';

export class ReactInitializer implements Initializer {
  async init(args: ClientAppArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-react',
          fetchWith: FetchWith.GraphQL,
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
        }
      : {};

    const answers = await prompt<ClientAppAnswer>(clientAppPrompts, { ...defaults, ...args });

    const templatePath = path.resolve(__dirname, '../../templates/react');
    await transform(templatePath, { ...args, ...answers });

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
      yes: args.yes,
    };

    return response;
  }
}
