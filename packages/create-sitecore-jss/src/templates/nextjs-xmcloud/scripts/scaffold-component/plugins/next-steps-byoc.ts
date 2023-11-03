import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Set next steps for BYOC component.
 */
class NextStepsByocPlugin implements ScaffoldComponentPlugin {
  order = 101;

  exec(config: ScaffoldComponentPluginConfig) {
    if (config.args.includes('--byoc')) {
      const { componentOutputPath } = config;

      config.nextSteps.push(
        `* Modify component registration through FEAAS.External.registerComponent if needed`
      );
      if (!(componentOutputPath as string).includes('src\\components')) {
        config.nextSteps.push(
          `* Ensure component availability by importing it in your app through src\\byoc or registering it in scripts\\generate-component-builder`
        );
      }
    }

    return config;
  }
}

export const nextStepsByocPlugin = new NextStepsByocPlugin();
