import path, { sep } from 'path';
import inquirer from 'inquirer';
import CheckboxPrompt from 'inquirer/lib/prompts/checkbox';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
  incompatibleAddonsMsg,
} from '../../common';

inquirer.registerPrompt('nextjs-sxa-checkbox', CheckboxPrompt);

export default class NextjsSxaInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openPackageJson(`${args.destination}${sep}package.json`);

    // TODO: prompts for SXA
    // const answers = await prompt<StyleguideAnswer>(styleguidePrompts, args);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-sxa');

    await transform(templatePath, mergedArgs);

    let addThemeProject: string[] = [];

    // prompt to select which theme projects to include
    // don't prompt for add-on initializers if --yes or they've already specified
    if (!args.yes && args.templates.includes('nextjs-sxa')) {
      const addThemeAnswer = await inquirer.prompt({
        type: 'nextjs-sxa-checkbox' as 'checkbox',
        name: 'addThemeProject',
        message: 'Would you like to include any projects?',
        choices: [
          {
            name:
              'nextjs-sxa-project-playtravel - Includes example components and assets for Play Travel project',
            value: 'nextjs-sxa-project-playtravel',
          },
        ],
      });
      addThemeProject = addThemeAnswer.addThemeProject;
    }

    if (
      args.templates.includes('nextjs-styleguide') ||
      pkg.config?.templates?.includes('nextjs-styleguide')
    ) {
      console.log(incompatibleAddonsMsg('nextjs-sxa', 'nextjs-styleguide'));
    }

    const response = {
      // TODO: next steps
      nextSteps: [],
      appName: mergedArgs.appName,
      initializers: [...addThemeProject],
    };

    return response;
  }
}
