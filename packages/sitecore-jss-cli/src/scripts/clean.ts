import { clean } from '@sitecore-jss/sitecore-jss-dev-tools';
import resolvePackage from '../resolve-package';

export const command = 'clean';

export const describe = 'Cleans the contents of a directory, by default the buildArtifactsPath.';

export const builder = {
  path: {
    requiresArgs: false,
    type: 'string',
    describe: 'The path to clean. Defaults to buildArtifactsPath config in package.json',
  },
};

export async function handler(argv: any) {
  const packageJson = await resolvePackage();

  if (!argv.path) {
    argv.path = packageJson.config.buildArtifactsPath;
  }

  if (!argv.path) {
    console.error('Path argument was not specified and no \'buildArtifactsPath\' in package.json.');
    process.exit(1);
  }

  if (argv.path.length === 0) {
    console.error(
      'Clean was requested with a blank path argument. This would delete cwd; aborting.'
    );
    process.exit(1);
  }

  clean({ path: argv.path });
}
