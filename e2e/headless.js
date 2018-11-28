/*
  Headless mode e2e test. Run after Smokey has passed (depends on existing scjssconfig.json existing)

  This test will basically:
  1) Reconfigure the layoutServiceHost to point to the SSR proxy
  2) Build the app to get a valid server bundle
  3) Deploy the build artifacts to the distPath under the SSR proxy code
  4) Configure and start the SSR proxy using environment variables
  5) Execute Cypress headless-mode e2e tests against it
*/

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const config = [
  {
    name: 'react',
    port: 31337,
  },
  {
    name: 'vue',
    port: 31338,
  },
  {
    name: 'angular',
    port: 31339,
  },
];

const ssrProxyRoot = path.resolve(path.join('..', 'samples', 'node-headless-ssr-proxy'));

function reconfigureAppForHeadlessMode(appConfig) {
  console.log(`Configuring ${appConfig.name} for headless mode...`);

  const jssConfigPath = path.join('..', 'samples', appConfig.name, 'scjssconfig.json');

  if (!fs.existsSync(jssConfigPath)) {
    throw new Error(`scjssconfig.json for app ${appConfig.name} was not found in ${jssConfigPath}`);
  }

  const json = JSON.parse(fs.readFileSync(jssConfigPath, 'utf8'));

  json.sitecore.instancePath = ssrProxyRoot;
  json.sitecore.layoutServiceHost = `http://localhost:${appConfig.port}`;

  fs.writeFileSync(jssConfigPath, JSON.stringify(json, null, 2));
}

function deployAppToHeadlessProxy(appConfig) {
  console.log(`Deploying ${appConfig.name} to headless proxy...`);

  const appRootPath = path.resolve(path.join('..', 'samples', appConfig.name));
  execSync('jss deploy files', { cwd: appRootPath, stdio: 'inherit' });
}

function startHeadlessProxyAsync(appConfig) {
  console.log(
    `Starting headless proxy for ${appConfig.name} on http://localhost:${appConfig.port}...`
  );
  const headlessProcess = exec(
    'npm run start',
    {
      cwd: ssrProxyRoot,
      env: {
        PORT: appConfig.port,
        SITECORE_API_HOST: `http://jss${appConfig.name}web`,
        SITECORE_JSS_SERVER_BUNDLE: `./dist/Jss${appConfig.name}Web/server.bundle`,
        ...process.env,
      },
    },
    (error, stdout) => {
      if (error) throw error;
      console.log(stdout);
    }
  );

  process.on('exit', () => {
    console.log(`Killing headless server ${appConfig.name}, PID ${headlessProcess.pid}`);
    // exec'd task.kill() does not work on Windows
    execSync(`taskkill /F /T /PID ${headlessProcess.pid}`);
  });
}

function executeCypressTests(appConfig) {
  console.log(`Running headless e2e on ${appConfig.name}...`);

  const gqlSsr = appConfig.name === 'vue' ? 'false' : 'true';
  try {
    execSync(
      // eslint-disable-next-line
    `npx cypress run --config baseUrl=http://localhost:${appConfig.port} --env SSR=true,GRAPHQL_SSR=${gqlSsr},FRAMEWORK=${appConfig.name}`,
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
  reconfigureAppForHeadlessMode(appConfig);
  deployAppToHeadlessProxy(appConfig);
  startHeadlessProxyAsync(appConfig);
});

console.log('Awaiting headless startup...');

setTimeout(() => {
  let error = null;

  config.some((appConfig) => {
    error = executeCypressTests(appConfig);

    return error;
  });

  if (error) {
    console.log('Leaving headless servers online to debug error. Press enter to stop servers.');
    process.stdin.once('data', () => {
      process.exit(1);
    });
  }

  process.exit(0);
}, 5000);
