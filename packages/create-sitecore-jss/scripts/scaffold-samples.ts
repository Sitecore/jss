import chalk from 'chalk';
import { initRunner } from '../src/init-runner';
// const templates = require('./templates.json');
import samplesToSacffold from './samples.json';

for (const sample of samplesToSacffold) {
  sample.args.appName = `sample-${sample.args.appName}`;
  console.log(chalk.green(`Initializing sample ${sample.args.appName} ...`));
  // we need to keep noInstall as true - otherwise both yarn install and lint will execute
  // we run lint separately in the azure pipeline
  let scaffoldArgs = {
    ...sample.args,
    templates: sample.initializers,
    yes: true,
    force: true,
    silent: true,
    noInstall: true,
  }
  initRunner(sample.initializers, scaffoldArgs);
}

