#!/usr/bin/env node

import path from 'path';
import { deploy, DeployOptions } from '../deploy';
import { replaceConfigTokens } from '../setup/jss-config';

const options = {} as DeployOptions;

process.argv.forEach((value, index, map) => {
  switch (value) {
    case '--destinationPath':
      options.destinationPath = path.normalize(replaceConfigTokens(map[index + 1]));
      break;
    case '--sourcePath':
      options.sourcePath = path.normalize(map[index + 1]);
      break;
    case '--excludeFile':
      options.excludeFile = map[index + 1];
      break;
    case '--clean':
      options.clean = true;
      break;
    default:
      break;
  }
});

if (!options.destinationPath) {
  console.error('deploy', 'please specify destination path via "--destinationPath" argument');
  process.exit(2);
}

if (!options.sourcePath) {
  console.error('deploy', 'please specify source path via "--sourcePath" argument');
  process.exit(2);
}

deploy(options as DeployOptions);
