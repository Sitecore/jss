import { packageDeploy, verifySetup, resolveScJssConfig } from '@sitecore-jss/sitecore-jss-dev-tools';
import resolvePackage from '../resolve-package';
import { builder as packageBuilder, handler as packageHandler } from './package';

export const command = 'items';

export const describe =
  'Deploys the app\'s Sitecore items to Sitecore. No files are deployed. `jss deploy items --help` for options.';

export const builder = {
  deployUrl: {
    requiresArg: false,
    type: 'string',
    describe:
      'URL to the Sitecore JSS import service that accepts the package deployment. Defaults to the \'deployUrl\' in scjssconfig.json.',
  },
  deploySecret: {
    requiresArg: false,
    type: 'string',
    alias: 's',
    describe:
      'Shared secret to authenticate the deployment with Sitecore. Defaults to the \'deploySecret\' in scjssconfig.json.',
  },
  debugSecurity: {
    requiresArgs: false,
    type: 'boolean',
    describe:
      'Enables diagnosing authentication issues with your deployment. Exposes secrets to output, use only for temporary diagnostics.',
    default: false,
  },
  skipPackage: {
    requiresArgs: false,
    type: 'boolean',
    describe:
      // tslint:disable-next-line:max-line-length
      'If true, skips build, manifest, and packaging steps. This can be used to consume existing output from jss package (via the packageOutputPath parameter) without rebuilding it.',
    default: false,
  },
  config: {
    requiresArg: false,
    type: 'string',
    describe: 'Path to scjssconfig file.',
    default: './scjssconfig.json',
  },
  proxy: {
    requiresArgs: false,
    type: 'string',
    describe: 'Specify a HTTP proxy to use when deploying items.',
  },
  acceptCertificate: {
    requiresArgs: false,
    type: 'string',
    describe: 'Whitelists a specific SSL certificate thumbprint, regardless of normal SSL validation. Useful for self-signed certificates.',
  },
  ...packageBuilder,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(argv: any) {
  verifySetup();

  const packageJson = await resolvePackage();

  if (!argv.appName) {
    argv.appName = packageJson.config.appName;
  }
  if (!argv.appName) {
    throw new Error('App Name was not defined as a parameter or in the package.json config');
  }

  const jssConfig = await resolveScJssConfig({ configPath: argv.config });

  if (!argv.deployUrl) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legacyConfig = jssConfig.sitecore as any;
    argv.deployUrl = legacyConfig.shipUrl
      ? legacyConfig.shipUrl
      : jssConfig.sitecore.deployUrl;
  }
  if (!argv.deployUrl) {
    throw new Error('deployUrl was not defined as a parameter or in the scjssconfig.json file');
  }

  if (/\/ship\/services\/package/.test(argv.deployUrl)) {
    throw new Error(
      // tslint:disable-next-line:max-line-length
      'deployUrl appears to be a Sitecore.Ship endpoint. JSS no longer uses Ship. You will need to reconfigure your endpoint to the JSS deploy service and provide an app shared secret to deploy.'
    );
  }

  if (!argv.deploySecret) {
    argv.deploySecret = jssConfig.sitecore.deploySecret;
  }
  if (!argv.deploySecret) {
    throw new Error('deploySecret was not defined as a parameter or in the scjssconfig.json file');
  }

  let continuation: Promise<unknown> = Promise.resolve();

  if (!argv.skipPackage) {
    continuation = packageHandler(argv);
  }

  return continuation.then(() => {
    const deployArgs = {
      appName: argv.appName,
      packagePath: argv.packageOutputPath,
      importServiceUrl: argv.deployUrl,
      secret: argv.deploySecret,
      debugSecurity: argv.debugSecurity,
      proxy: argv.proxy,
      acceptCertificate: argv.acceptCertificate,
    };

    return packageDeploy(deployArgs).catch((error) => {
      if (error) {
        console.log(error);
      }
      process.exit(1);
    });
  });
}
