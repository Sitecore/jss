import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import chalk from 'chalk';

const installHooks = async () => {
  try {
    const appPath = path.join(__dirname, '..').replace(/\\/g, '/');
    const { stdout } = await promisify(exec)('git rev-parse --show-toplevel');
    const gitRootPath = stdout.trim();
    console.log(chalk.green(`Writing data to local .git folder ${gitRootPath}...`));

    const data = `#!/bin/sh
#
# pre-push hook runs our linter before we push our changes
#
# To skip this hook, use the --no-verify flag
# when pushing.
#
echo "Running lint check..."
cd ${appPath}
npm run lint`;

    await promisify(fs.writeFile)(`${gitRootPath}/.git/hooks/pre-push`, data, 'utf8');
    console.log(chalk.green('Success'));
  } catch (error) {
    console.log(chalk.red(`Error installing hook: ${error}`));
  }
};

installHooks();
