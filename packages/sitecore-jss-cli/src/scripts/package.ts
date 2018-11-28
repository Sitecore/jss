import { packageGenerate } from '@sitecore-jss/sitecore-jss-dev-tools';
import resolvePackage from '../resolve-package';
import { builder as manifestBuilder, handler as manifestHandler } from './manifest';

export const command = 'package';

export const describe =
  // tslint:disable-next-line:max-line-length
  'Generates a JSS manifest package file that can be deployed to Sitecore. Nothing is deployed. See also jss deploy package, which takes the package and deploys it to Sitecore. `jss package --help` for options.';

export const builder = {
  packageOutputPath: {
    requiresArgs: false,
    type: 'string',
    describe: 'The location the JSS manifest package will be written to.',
    default: './sitecore/package',
  },
  skipManifest: {
    requiresArgs: false,
    type: 'boolean',
    describe:
      // tslint:disable-next-line:max-line-length
      'If true, skips manifest generation. This can be used to consume existing output from jss manifest (via the manifestOutputPath parameter) without rebuilding it.',
    default: false,
  },
  // note we're inheriting jss manifest's args here
  ...manifestBuilder,
};

export async function handler(argv: any) {
  const packageJson = await resolvePackage();

  if (!argv.appName) {
    argv.appName = packageJson.config.appName;
  }
  if (!argv.appName) {
    throw new Error('App Name was not defined as a parameter or in the package.json config');
  }

  let continuation: Promise<any> = Promise.resolve();

  // if we need items, generate the manifest
  if (!argv.noItems && !argv.skipManifest) {
    continuation = manifestHandler(argv);
  }
  return continuation.then(() => {
    const generateArgs = {
      appName: argv.appName,
      manifestPath: argv.manifestOutputPath,
      manifestFileName: 'sitecore-import.json',
      outputPath: argv.packageOutputPath,
    };

    console.log(`JSS is manifest packaging ${argv.appName} to ${argv.packageOutputPath}...`);

    return packageGenerate(generateArgs);
  });
}
