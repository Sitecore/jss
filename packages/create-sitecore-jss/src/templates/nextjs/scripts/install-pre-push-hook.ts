import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const gitRootDirMessage = '\x1b[32m%s\x1b[0m';
const successMessage = '\x1b[32m%s\x1b[0m';
const errorMessage = '\x1b[31m%o\x1b[0m';

const installHooks = async () => {
  try {
    const appPath = path.join(__dirname, '..').replace(/\\/g, '/');
    const { stdout } = await promisify(exec)('git rev-parse --show-toplevel');
    const gitRootPath = stdout.trim();
    console.log(gitRootDirMessage, 'Writing data to local .git folder...');

    const data = `#!/bin/sh
    # pre-push hook runs our linter before we push our changes
    #
    # To skip this hook, use the --no-verify flag
    # when pushing.
    echo "Running lint check..."
    cd ${appPath}
    npm run lint
  `;

    await promisify(fs.writeFile)(`${gitRootPath}/.git/hooks/pre-push`, data, 'utf8');
    console.log(successMessage, 'Success!');
  } catch (error) {
    console.log(errorMessage, `Error installing hook: ${error}`);
  }
};

installHooks();
