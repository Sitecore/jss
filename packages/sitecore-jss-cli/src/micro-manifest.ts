import {
  packageDeploy,
  resolveScJssConfig,
  verifySetup,
} from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import resolvePackage from './resolve-package';
import { handler as manifestHandler } from './scripts/manifest';
import { handler as packageHandler } from './scripts/package';

/**
 * @param {any} argv
 * @param {string} manifestContents
 */
export default async function microManifest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  argv: { [key: string]: any },
  manifestContents: string
) {
  verifySetup();

  const packageJson = await resolvePackage();

  if (!argv.appName) {
    argv.appName = packageJson.config.appName;
  }
  if (!argv.appName) {
    throw new Error('App Name was not defined as a parameter or in the package.json config');
  }

  const jssConfig = await resolveScJssConfig({ configPath: argv.config as string });

  if (!argv.deployUrl) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legacyConfig = jssConfig.sitecore as any;
    argv.deployUrl = legacyConfig.shipUrl ? legacyConfig.shipUrl : jssConfig.sitecore.deployUrl;
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

  return new Promise<void>((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, async (err, tempDir, cleanupTempDir) => {
      if (err) {
        reject(err);
      }

      // generate micro-manifest to deploy with
      const manifestFolder = path.join(tempDir, 'manifest');
      if (!fs.existsSync(manifestFolder)) {
        fs.mkdirSync(manifestFolder);
      }

      const manifestArgs = {
        manifestSourceFiles: [path.join(manifestFolder, 'tempManifestSource.js')],
        manifestOutputPath: path.join(manifestFolder, 'tempManifest.json'),
        noDictionary: true,
        ...argv,
      };

      // write temporary manifest source file to generate from
      fs.writeFileSync(manifestArgs.manifestSourceFiles[0], manifestContents, 'utf8');

      await manifestHandler(manifestArgs);

      // run a package deploy of our custom manifest
      const packageDir = path.join(tempDir, 'package');
      if (!fs.existsSync(packageDir)) {
        fs.mkdirSync(packageDir);
      }

      const packageArgs = {
        skipManifest: true,
        noFiles: true,
        packageOutputPath: path.join(packageDir, 'tempPackage.manifest.zip'),
        ...manifestArgs,
      };

      await packageHandler(packageArgs);

      const deployArgs = {
        appName: argv.appName,
        packagePath: packageArgs.packageOutputPath,
        importServiceUrl: argv.deployUrl,
        secret: argv.deploySecret,
        debugSecurity: argv.debugSecurity,
        acceptCertificate: argv.acceptCertificate,
      };

      await packageDeploy(deployArgs);

      cleanupTempDir();

      resolve();
    });
  });
}
