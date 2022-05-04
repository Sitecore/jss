const execSync = require('child_process').execSync;

// restore yarn.lock file post initializing a sample app using watch script.
export const postInstall = () => {
  const output = execSync('git status', { encoding: 'utf-8' });
  if (output.includes('yarn.lock')) {
    execSync('git restore ../../yarn.lock', { encoding: 'utf-8' });
  }
};

postInstall();
