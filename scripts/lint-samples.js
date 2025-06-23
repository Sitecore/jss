const { execSync } = require('child_process');
const samples = require('./samples.json');
const { getAppName } = require('./utils');

const runLintCommand = (scope) =>
  execSync(`lerna run lint --scope ${scope} -- --fix`, {
    stdio: 'inherit',
  });

const apps = samples.map((sample) => getAppName(sample.args));

runLintCommand(`{${apps.join(',')}}`);
