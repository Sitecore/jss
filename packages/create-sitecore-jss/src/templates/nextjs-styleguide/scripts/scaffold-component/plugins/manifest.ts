import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentManifest from 'scripts/templates/component-manifest';
import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';

/**
 * Generates the manifest file.
 */
class ManifestPlugin implements ScaffoldComponentPlugin {
  order = 10;

  componentManifestDefinitionsPath = 'sitecore/definitions/components';

  exec(config: ScaffoldComponentPluginConfig) {
    const { componentPath, componentName } = config;
    let manifestOutputPath = null;

    if (fs.existsSync(this.componentManifestDefinitionsPath)) {
      const outputFilePath = path.join(
        this.componentManifestDefinitionsPath,
        componentPath,
        `${componentName}.sitecore.ts`
      );

      manifestOutputPath = scaffoldFile(outputFilePath, generateComponentManifest(componentName));
    } else {
      console.log(
        chalk.red(`Not scaffolding manifest because ${this.componentManifestDefinitionsPath}
did not exist. This is normal for Sitecore-first workflow.`)
      );
    }

    return {
      ...config,
      manifestOutputPath,
    };
  }
}

export const manifestPlugin = new ManifestPlugin();
