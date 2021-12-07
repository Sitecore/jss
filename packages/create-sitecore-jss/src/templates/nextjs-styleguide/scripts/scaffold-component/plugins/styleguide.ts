import chalk from 'chalk';
import fs from 'fs';

import { Plugin } from '../index';

import generateComponentManifest from 'scripts/templates/component-manifest';

const componentManifestDefinitionsPath = 'sitecore/definitions/components';

export const styleguidePlugin: Plugin = ({ scaffoldFile, componentName }) => {
  let manifestOutputPath: string | null = null;
  const steps = [];

  if (fs.existsSync(componentManifestDefinitionsPath)) {
    const filename = `${componentName}.sitecore.ts`;

    manifestOutputPath = scaffoldFile(
      componentManifestDefinitionsPath,
      generateComponentManifest(componentName),
      filename
    );
  } else {
    console.log(
      chalk.red(`Not scaffolding manifest because ${componentManifestDefinitionsPath}
	did not exist. This is normal for Sitecore-first workflow.`)
    );
  }

  if (manifestOutputPath) {
    steps.push(
      `* Define the component's data in ${chalk.green(manifestOutputPath)}`,
      `* Add the component to a route layout (/data/routes) and test it with ${chalk.green(
        'jss start'
      )}`
    );
  }

  return { codeFirst: !!manifestOutputPath, steps };
};
