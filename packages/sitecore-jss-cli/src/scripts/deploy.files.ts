import { deploy, verifySetup, resolveScJssConfig } from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';
import path from 'path';
import resolvePackage from '../resolve-package';
import runPackageScript from '../run-package-script';

export const command = 'files';

export const describe =
  // tslint:disable-next-line:max-line-length
  'Deploys the app\'s build artifact files to the Sitecore server using a direct file copy (no Sitecore items will be deployed). `jss deploy files --help` for options.';

export const builder = {
  source: {
    requiresArg: false,
    type: 'string',
    describe:
      'The artifact files to deploy. Defaults to \'buildArtifactsPath\' setting from package.json.',
  },
  destination: {
    requiresArg: false,
    type: 'string',
    describe:
      // tslint:disable-next-line:max-line-length
      'Destination path to deploy to. Defaults to the \'instancePath\' set in scjssconfig.json, combined with the \'sitecoreDistPath\' setting from package.json.',
	},
	config: {
		requiresArg: false,
		type: 'string',
		describe: 'Path to scjssconfig file.',
		default: './scjssconfig.json'
	},
  exclude: {
    requiresArg: false,
    type: 'array',
    describe: 'Filters specific file(s) from the deployment package by file name(s)',
    default: ['report.html'],
  },
  skipBuild: {
    requiresArg: false,
    type: 'boolean',
    describe:
      'If true, no build task is invoked and any existing build artifacts at the source path are deployed.',
    default: false,
  },
  buildTaskName: {
    requiresArg: false,
    type: 'string',
    describe:
      // tslint:disable-next-line:max-line-length
      'Name of the npm script to run to perform a build before deploying. To skip running any script, use --skipBuild or pass the argument with a blank value.',
    default: 'build',
  },
  clean: {
    requiresArg: false,
    type: 'boolean',
    describe:
      'Whether to delete all existing items in the destination before copying new artifacts.',
    default: false,
  },
};

export async function handler(argv: any) {
  verifySetup();

  if (!argv.skipBuild && argv.buildTaskName && argv.buildTaskName.length > 0) {
    runPackageScript([argv.buildTaskName]);
  }

  const options = {
    destinationPath: argv.destination,
    sourcePath: argv.source,
    excludeFile: argv.exclude,
    clean: argv.clean,
  };

  if (!options.sourcePath || !options.destinationPath) {
    const packageJson = await resolvePackage();

    if (!options.sourcePath) {
      options.sourcePath = packageJson.config.buildArtifactsPath;
      if (!options.sourcePath) {
        // nothing explicit set, let's try to imply a path. 'build/index.html' = CRA convention
        if (fs.existsSync('build/index.html')) {
          options.sourcePath = path.resolve('build');
        } else if (fs.existsSync('dist/client.bundle.js')) {
          // /dist = non-CRA convention
          options.sourcePath = path.resolve('dist');
        } else {
          throw new Error(
            'No source path specified, conventional build paths missing, and buildArtifactsPath config is not defined in package.json!'
          );
        }
      }
    }

    if (!options.destinationPath) {
      const scJssConfig = await resolveScJssConfig({ configPath: argv.config });

      options.destinationPath = path.join(
        scJssConfig.sitecore.instancePath as string,
        packageJson.config.sitecoreDistPath
      );
    }
  }

  deploy(options);
}
