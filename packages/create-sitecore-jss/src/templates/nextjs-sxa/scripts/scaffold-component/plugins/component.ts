import path from 'path';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentSrc from 'scripts/templates/component-src';
import generateByocComponentSrc from 'scripts/templates/byoc-component-src';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the component file.
 */
class ComponentPlugin implements ScaffoldComponentPlugin {
  order = 0;

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentName, componentPath } = config;
    const filename = `${componentName}.tsx`;
    const componentRoot = componentPath.startsWith('src/') ? '' : 'src/components';
    const outputFilePath = path.join(componentRoot, componentPath, filename);
    const template = config.isByoc
      ? generateByocComponentSrc(componentName)
      : generateComponentSrc(componentName);

    const componentOutputPath = scaffoldFile(outputFilePath, template);

    return {
      ...config,
      componentOutputPath,
    };
  }
}

export const componentPlugin = new ComponentPlugin();
