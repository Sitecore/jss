const crossSpawn = require('cross-spawn');

const start = (platform, envVars, port) => {
  const commonArgs = [];
  if (port) {
    commonArgs.push('--port', port);
  }

  // `react-native/local-cli/cli.js start` is the process that will invoke babel.
  // by default the RN packager will cache resolved dependencies.
  // but, we're changing dependencies based on environment variable in .babelrc.js.
  // so, need to reset the cache on start.
  const startCommand = `node node_modules/react-native/local-cli/cli.js start --reset-cache`;

  // if on MacOS (darwin), we're using "ttab" to launch terminal windows/tabs
  if (process.platform === 'darwin') {
    // re-assembling the env vars as a string
    const envVarString = Object.keys(envVars).reduce(
      (result, envVarKey) => `${result}${envVarKey}='${envVars[envVarKey]}' `,
      ''
    );

    crossSpawn('ttab', [`${envVarString}${startCommand}`], commonArgs, {
      cwd: process.cwd(),
    });

    if (platform === 'ios') {
      crossSpawn('ttab', ['react-native run-ios'], commonArgs, {});
    } else if (platform === 'android') {
      crossSpawn('ttab', ['react-native run-android'], commonArgs, {});
    }
  } else if (process.platform === 'win32') {
    // on windows, the command and arguments need to be a single string in order for the terminals running the commands below to show console output, instead of spawn(cmd, [args]);
    // strange, but there you have it.
    crossSpawn(startCommand, commonArgs, {
      cwd: process.cwd(),
      detached: true,
      env: envVars,
      stdio: 'inherit',
    });

    if (platform === 'android') {
      crossSpawn('react-native run-android', commonArgs, {
        stdio: 'inherit',
      });
    }
  }
};

module.exports = {
  start,
};
