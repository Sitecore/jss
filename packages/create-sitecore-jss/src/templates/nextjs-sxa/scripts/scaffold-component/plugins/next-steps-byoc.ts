import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Set next steps for BYOC component.
 */
class NextStepsByocPlugin implements ScaffoldComponentPlugin {
  order = 101;

  exec(config: ScaffoldComponentPluginConfig) {
    if (config.args.includes('--byoc')) {
      config.nextSteps.push(
        `* Modify component registration through FEAAS.External.registerComponent if needed`
      );
    }

    return config;
  }
}

export const nextStepsByocPlugin = new NextStepsByocPlugin();
