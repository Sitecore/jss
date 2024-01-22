import chalk from 'chalk';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Set next steps.
 */
class NextStepsStyleguidePlugin implements ScaffoldComponentPlugin {
  order = 101;

  exec(config: ScaffoldComponentPluginConfig) {
    const { manifestOutputPath, componentName } = config;

    if (manifestOutputPath) {
      config.nextSteps.push(`* Define the component's data in ${chalk.green(manifestOutputPath)}`);
    } else {
      config.nextSteps.push(
        `* Scaffold the component in Sitecore using '${chalk.green(
          `jss deploy component ${componentName} --allowedPlaceholders placeholder-for-component`
        )}, or create the rendering item and datasource template yourself.`
      );
    }
    if (manifestOutputPath) {
      config.nextSteps.push(
        `* Add the component to a route layout (/data/routes) and test it with ${chalk.green(
          'jss start'
        )}`
      );
    } else {
      config.nextSteps.push(
        `* Deploy your app with the new component to Sitecore (${chalk.green(
          'jss deploy:watch'
        )} or ${chalk.green('jss deploy files')})`
      );
      config.nextSteps.push(`* Add the component to a route using Sitecore Experience Editor, and test it.`);
    }

    return config;
  }
}

export const nextStepsStyleguidePlugin = new NextStepsStyleguidePlugin();
