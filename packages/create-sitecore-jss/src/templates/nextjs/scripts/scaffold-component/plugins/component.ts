import path from 'path';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the component file.
 */
class ComponentPlugin implements ScaffoldComponentPlugin {
  order = 99;

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentName, componentPath } = config;
    const filename = `${componentName}.tsx`;
    const componentRoot = componentPath.startsWith('src/') ? '' : 'src/components';
    const outputFilePath = path.join(componentRoot, componentPath, filename);
    const template = config.componentTemplateGenerator(componentName);

    const componentOutputPath = scaffoldFile(outputFilePath, template);

    return {
      ...config,
      componentOutputPath,
    };
  }
}

export const componentPlugin = new ComponentPlugin();
