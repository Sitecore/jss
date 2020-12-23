import { clean } from '@sitecore-jss/sitecore-jss-dev-tools';
import { generateToFile } from '@sitecore-jss/sitecore-jss-manifest';
import chalk from 'chalk';
import { existsSync } from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import resolvePackage from '../resolve-package';

export const command = 'manifest';

export const describe =
  'Generates a JSS manifest file which defines app assets to import into Sitecore. Nothing is deployed or added to a deployment package; this just collects assets. See `jss package`, which takes the manifest and turns it into a deployable package. `jss manifest --help` for options.';

export const builder = {
  appName: {
    requiresArg: false,
    type: 'string',
    describe: 'The name of the app. Defaults to the package.json config value.',
  },
  manifestSourceFiles: {
    requiresArgs: false,
    describe: 'The files or file patterns to parse to generate the manifest.',
    type: 'array',
    default: ['./sitecore/definitions/**/*.sitecore.js', './sitecore/definitions/**/*.sitecore.ts'],
  },
  require: {
    requiresArgs: false,
    type: 'string',
    describe:
      'A JS module to require before processing the manifest. This may initialize a custom compiler (Babel, TypeScript), perform init tasks, etc.',
    default: './sitecore/definitions/config.js',
  },
  manifestOutputPath: {
    requiresArgs: false,
    type: 'string',
    describe: 'The path of the file to which manifest output will be written.',
    default: './sitecore/manifest',
  },
  includeContent: {
    requiresArgs: false,
    type: 'boolean',
    describe: 'Includes content and media items in the manifest output.',
    default: false,
    alias: 'c',
  },
  includeDictionary: {
    requiresArgs: false,
    type: 'boolean',
    describe: 'Includes dictionary items in the manifest output.',
    default: false,
    alias: 'd',
  },
  language: {
    requiresArgs: false,
    type: 'string',
    describe:
      'Defines the language the manifest represents. Defaults to the language config in the package.json.',
    alias: 'l',
  },
  rootPlaceholders: {
    requiresArgs: false,
    type: 'array',
    describe:
      'Sets the root placeholder name(s) for the app. If set, overrides root placeholders set in the package.json',
    alias: 'p',
  },
  wipe: {
    requiresArgs: false,
    type: 'boolean',
    describe:
      'Causes the JSS import to run as a wipe + recreate of any existing app items. Pass --unattendedWipe in addition to bypass interactive confirmation for CI scenarios.',
    alias: 'w',
    default: false,
  },
  unattendedWipe: {
    requiresArgs: false,
    hidden: true,
    type: 'boolean',
  },
  pipelinePatchFiles: {
    requiresArgs: false,
    type: 'array',
    describe: 'List of files or file patterns from which to load pipeline config patch files.',
    default: ['./sitecore/pipelines/**/*.patch.js', './sitecore/pipelines/**/*.patch.ts'],
  },
  debug: {
    requiresArgs: false,
    type: 'boolean',
    describe: 'If true, emits additional diagnostic information',
    default: false,
  },
  allowConflictingPlaceholderNames: {
    requiresArgs: false,
    type: 'boolean',
    describe: 'Enables using placeholder names that conflict with Sitecore or SXA',
    default: false,
    alias: 'a',
  },
};

/**
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(argv: any) {
  const packageJson = await resolvePackage();

  let language = argv.language;
  if (!language && packageJson && packageJson.config && packageJson.config.language) {
    language = packageJson.config.language;
  }
  if (!language) {
    throw 'Language was not defined as a parameter or in the package.json { config: { language: "en" } }';
  }

  let appName = argv.appName;
  if (!appName && packageJson && packageJson.config && packageJson.config.appName) {
    appName = packageJson.config.appName;
  }
  if (!appName) {
    throw '--appName was not defined as a parameter or in the package.json { config: { appName: "myJssAppName" } }';
  }

  let rootPlaceholders = argv.rootPlaceholders;
  if (
    !rootPlaceholders &&
    packageJson &&
    packageJson.config &&
    packageJson.config.rootPlaceholders
  ) {
    rootPlaceholders = packageJson.config.rootPlaceholders;
  }
  if (!rootPlaceholders) {
    throw '--rootPlaceholders was not defined as a parameter or in the package.json { config: { rootPlaceholders: ["ph-name"] } }';
  }

  if (argv.wipe && !argv.unattendedWipe) {
    console.warn(chalk.yellow('Are you sure you want to wipe any existing app from Sitecore?'));
    if (
      !readlineSync.keyInYN(chalk.yellow('This will delete any content changes made in Sitecore'))
    ) {
      process.exit(1);
    }
  }

  const generateArgs = {
    fileGlobs: argv.manifestSourceFiles,
    requireArg: argv.require,
    appName,
    excludeItems: !argv.includeContent,
    excludeMedia: !argv.includeContent,
    excludeDictionary: !argv.includeDictionary,
    outputPath: `${argv.manifestOutputPath}/sitecore-import.json`,
    language,
    pipelinePatchFileGlobs: argv.pipelinePatchFiles,
    debug: argv.debug,
    rootPlaceholders,
    wipe: argv.wipe,
    skipPlaceholderBlacklist: argv.allowConflictingPlaceholderNames,
  };

  console.log(`JSS is creating a manifest for ${appName} to ${argv.manifestOutputPath}...`);

  if (existsSync(argv.manifestOutputPath)) {
    clean({ path: argv.manifestOutputPath });
  }

  const assetsPath = path.join(argv.manifestOutputPath, 'assets');
  if (existsSync(assetsPath)) {
    clean({ path: assetsPath });
  }

  return generateToFile(generateArgs).catch((err) => {
    console.error('Error generating manifest', err);
    process.exit(1);
  });
}
