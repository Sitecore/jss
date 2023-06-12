import chalk from 'chalk';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Logs next steps. Should be the last plugin to run.
 */
class NextStepsPlugin implements ScaffoldComponentPlugin {
  order = 100;

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentOutputPath, manifestOutputPath, componentName } = config;

    console.log(
      chalk.green(`
Scaffolding of ${componentName} complete.
Next steps:`)
    );

    if (manifestOutputPath) {
      console.log(`* Define the component's data in ${chalk.green(manifestOutputPath)}`);
    } else {
      console.log(
        `* Scaffold the component in Sitecore using '${chalk.green(
          `jss deploy component ${componentName} --allowedPlaceholders placeholder-for-component`
        )}, or create the rendering item and datasource template yourself.`
      );
    }
    if (componentOutputPath) {
      console.log(`* Implement the React component in ${chalk.green(componentOutputPath)}`);
    }
    if (manifestOutputPath) {
      console.log(
        `* Add the component to a route layout (/data/routes) and test it with ${chalk.green(
          'jss start'
        )}`
      );
    } else {
      console.log(
        `* Deploy your app with the new component to Sitecore (${chalk.green(
          'jss deploy:watch'
        )} or ${chalk.green('jss deploy files')})`
      );
      console.log(`* Add the component to a route using Sitecore Experience Editor, and test it.`);
    }

    return config;
  }
}

export const nextStepsPlugin = new NextStepsPlugin();
