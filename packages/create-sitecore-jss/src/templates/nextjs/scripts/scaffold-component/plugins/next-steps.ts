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
        chalk.green(`
Scaffolding of ${componentName} complete.
Next steps:`),
        `* Implement the React component in ${chalk.green(componentOutputPath)}`
      );
    }

    return config;
  }
}

export const nextStepsPlugin = new NextStepsPlugin();
