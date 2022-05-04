const execSync = require('child_process').execSync;

// restore dependencies added to yarn.lock file post initializing a sample app using the watch script.
// this is necessary so that these dependencies dont get committed to the source control.
export const postInstall = () => {
  const output = execSync('git status', { encoding: 'utf-8' });
  if (output.includes('yarn.lock')) {
    execSync('git restore ../../yarn.lock', { encoding: 'utf-8' });
  }
};

postInstall();
