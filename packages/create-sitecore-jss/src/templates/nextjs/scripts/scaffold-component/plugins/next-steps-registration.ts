import chalk from 'chalk';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

class NextStepsRegistrationPlugin implements ScaffoldComponentPlugin {
  order = 101;

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentOutputPath, componentName } = config;

    if (!(componentOutputPath as string).includes('src/components')) {
        config.nextSteps.push(
          `* ${chalk.green(
            componentName
          )} has been created outside src\\components. Ensure it is registered via scripts\\generate-component-builder.`
        );
    }

    return config;
  }
}

export const nextStepsRegistrationPlugin = new NextStepsRegistrationPlugin();
