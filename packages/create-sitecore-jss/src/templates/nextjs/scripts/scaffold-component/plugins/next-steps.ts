import chalk from 'chalk';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Set next steps.
 */
class NextStepsPlugin implements ScaffoldComponentPlugin {
  order = 100;

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentOutputPath, componentName } = config;

    if (componentOutputPath) {
      config.nextSteps.push(
        `* Implement the React component in ${chalk.green(componentOutputPath)}`
      );
    }
    if (!(componentOutputPath as string).includes('src\\components')) {
      config.nextSteps.push(
        `* ${chalk.green(
          componentName
        )} has been created outside src\\components. Ensure it is registered via scripts\\generate-component-builder.`
      );
    }

    return config;
  }
}

export const nextStepsPlugin = new NextStepsPlugin();
