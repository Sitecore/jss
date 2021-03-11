/*
  App mode e2e test. Run after Smokey has passed (depends on existing scjssconfig.json existing)

  This test will basically:
  1) Execute the app in disconnected or connected mode
  2) Run Cypress e2e tests against the app
*/

const path = require('path');
const { execSync, exec } = require('child_process');

const verb = process.argv[2];

if (!verb || (verb !== 'connected' && verb !== 'disconnected')) {
  console.error(
    'Mode not specified or invalid mode. Pass "connected" or "disconnected" to script.'
  );
  process.exit(1);
}

const config = [
  // Due to current inablitiy to set\change a port for the next.js app 
  // this section has to be commented due to conflict with angular app on the same port untill this is resolved
  // {
  //   name: 'nextjs',
  //   port: 3000,
  //   proxyPort: 1336,
  // },
  {
    name: 'react',
    port: 1337,
    proxyPort: 1338,
  },
  {
    name: 'vue',
    port: 1339,
    proxyPort: 1340,
  },
  {
    name: 'angular',
    // note: angular does not allow port injection from env because config is json not js
    // so this is not respected (these are the default ports)
    port: 3000,
    proxyPort: 3043,
  },
];

function startAppAsync(appConfig) {
  console.log(`Starting ${appConfig.name}...`);

  const command = verb === 'connected' ? 'start:connected' : 'start';
  const appRoot = path.resolve(path.join('..', 'samples', appConfig.name));

  const headlessProcess = exec(
    `npm run ${command}`,
    {
      cwd: appRoot,
      env: {
        PORT: appConfig.port,
        PROXY_PORT: appConfig.proxyPort,
        ...process.env,
      },
      maxBuffer: 1024 * 1024 * 50, // 50mb, webpack can break default 200k limit ;)
    },
    (error, stdout) => {
      if (error) throw error;
      console.log(stdout);
    }
  );

  process.on('exit', () => {
    console.log(`Killing JSS app server ${appConfig.name}, PID ${headlessProcess.pid}`);
    // exec'd task.kill() does not work on Windows
    execSync(`taskkill /F /T /PID ${headlessProcess.pid}`);
  });
}

function executeCypressTests(appConfig) {
  console.log(`Running ${verb} e2e on ${appConfig.name}...`);

  const graphQL = verb === 'connected' ? 'true' : 'false';

  try {
    execSync(
      // eslint-disable-next-line
    `npx cypress run --config baseUrl=http://localhost:${appConfig.port} --env SSR=false,GRAPHQL=${graphQL},FRAMEWORK=${appConfig.name}`,
      { cwd: path.resolve('./cypress'), stdio: 'inherit' }
    );
  } catch (error) {
    // eslint-disable-next-line
    console.log(`ERROR running tests on ${appConfig.name}. Check the failed tests on http://localhost:${appConfig.port}`, error.toString());
    return error;
  }

  return null;
}

// configure apps for headless mode and fire-and-forget launch their server
config.forEach((appConfig) => {
  startAppAsync(appConfig);
});

// hack: specific wait time to give the app time to build/start its WDS instance
// a better solution would be to have some retry/port check logic but this is simple enough for a manual script run without any deps.
const appStartupDelay = 60000;
console.log('Awaiting app startup...');

setTimeout(() => {
  let error = null;

  config.some((appConfig) => {
    error = executeCypressTests(appConfig);

    return error;
  });

  if (error) {
    console.log('Leaving servers online to debug error. Press enter to stop servers.');
    process.stdin.once('data', () => {
      process.exit(1);
    });
  }

  process.exit(0);
}, appStartupDelay);
