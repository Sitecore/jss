/* eslint-disable prettier/prettier */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Argv } from '../../node_modules/@types/yargs';
import { FolderSource } from '../create/create.source.folder';
import { GitHubSource } from '../create/create.source.github';
import { runPackageManagerCommand } from '../run-package-script';
import spawn from '../spawn';

export function builder(yargs: Argv) {
  return yargs.command(
    'create <name> <template>',
    'Creates a new JSS application based on one of the sample apps.',
    (innerBuilder) =>
      innerBuilder
        .positional('name', {
          type: 'string',
          describe: 'The name of the app to create. ',
        })
        .positional('template', {
          type: 'string',
          describe:
            'The template to create the app from; corresponds to folders in https://github.com/Sitecore/jss/tree/master/samples',
        })
        .option('hostName', {
          requiresArg: false,
          type: 'string',
          describe:
            'Sets the host name of the Sitecore site if this app is deployed to Sitecore. Defaults to \'$name.dev.local\'',
        })
        .option('repository', {
          requiresArg: false,
          type: 'string',
          alias: 'r',
          default: 'Sitecore/jss',
          describe:
            'Configures the GitHub repository to get the app from. Used to create from your own custom templates. Ex: myOrg/myRepository',
        })
        .option('branch', {
          requiresArg: false,
          type: 'string',
          alias: 'b',
          default: 'master',
          describe:
            'Configures the GitHub branch to get the app from. Used to create from your own custom templates. Ex: beta',
        })
        .option('source', {
          requiresArg: false,
          type: 'string',
          alias: 's',
          describe:
            'Sources the app template from a local filesystem path, instead of a GitHub repository. Good for private templates.',
        })
        .option('proxy', {
          requiresArg: false,
          type: 'string',
          describe: 'Specify a HTTP proxy when downloading templates.',
        }),
    handler
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handler(argv: any) {
  const newProjectPath = path.join(process.cwd(), argv.name);
  const createScriptPath = path.join(newProjectPath, 'jss-create.js');

  argv.hostName = argv.hostName ? argv.hostName : `${argv.name}.dev.local`;

  checkName(argv.name, newProjectPath);

  const source = argv.source
    ? new FolderSource(argv, newProjectPath)
    : new GitHubSource(argv, newProjectPath);

  await source.getFromSource();

  installPackages(newProjectPath);

  let nextStepsList = ['* Enable source control (i.e. git init)'];

  if (!argv.start) {
    nextStepsList.push(
      `* Try out your application with ${chalk.green(`cd ${argv.name}`)} then ${chalk.green(
        'jss start'
      )}`
    );
  }

  nextStepsList.push(`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`);
  nextStepsList.push('* Check out the JSS documentation at https://jss.sitecore.net');

  if (!fs.existsSync(createScriptPath)) {
    console.warn(
      chalk.yellow(
        `Template ${argv.template} did not have a jss-create.js in its root to invoke. No template configuration will be performed.`
      )
    );
  } else {
    const createScript = require(createScriptPath);

    nextStepsList = createScript(argv, nextStepsList);

    fs.unlinkSync(createScriptPath);
  }

  nextSteps(argv.name, nextStepsList);
}

function checkName(name: string, proposedPath: string) {
  if (!/^[a-z\-_.]+$/.test(name)) {
    console.error(
      chalk.red(
        `${name} is not a valid name; you may use lowercase letters, hyphens, and underscores only.`
      )
    );
    process.exit(1);
  }

  if (fs.existsSync(proposedPath)) {
    console.error(
      chalk.red(`${proposedPath} already exists; please delete it first if you wish to overwrite.`)
    );
    process.exit(1);
  }
}

function installPackages(projectFolder: string) {
  console.log(chalk.cyan('Installing packages...'));
  runPackageManagerCommand(['install'], { cwd: projectFolder, encoding: 'utf8' });

  // when we run `create` against development prerelease packages, we must:
  // a) run the command within the 'samples' folder of the jss repo
  // b) run `lerna bootstrap` to link the latest packages into the created app
  const lernaPath = path.join(projectFolder, '..', '..');
  if (fs.existsSync(path.join(lernaPath, 'lerna.json'))) {
    console.log(
      chalk.yellow(
        'Detected development environment with Lerna monorepo. Running lerna bootstrap to link prerelease packages.'
      )
    );

    // lerna throws if two packages have the same name, and right now
    // the template we instantiated will have the same package name
    // as the sample it came from (we replace vars etc later as that requires the local CLI to be installed)
    // Thus, we give it a temporary name here
    const packagePath = path.join(projectFolder, 'package.json');
    const existingPackage = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    existingPackage.name = 'temp-package-name-for-jss-lerna';
    fs.writeFileSync(packagePath, JSON.stringify(existingPackage, null, 2));

    // bootstrap
    spawn('npx', ['lerna', 'bootstrap'], {
      cwd: projectFolder,
      encoding: 'utf8',
    });
  }
}

function nextSteps(name: string, nextStepsArray: string[]) {
  console.log(chalk.red('                 -/oyhdmNNNNmdhyo/-                '));
  console.log(chalk.red('             :sdMMMMMMMMMMMMMMMMMMMMds:            '));
  console.log(chalk.red('          :yNMMMMMMMMMMMMMMMMMMMMMMMMMMNy:         '));
  console.log(chalk.red('        /mMMMMMMMMMNdyo+//://+shmMMMMMMMMMm/       '));
  console.log(chalk.red('      :mMMMMMMMMh+.              `:smMMMMMMMm:     '));
  console.log(chalk.red('    `yMMMMMMMm+`                     :yMMMMMMMs`   '));
  console.log(chalk.red('   `dMMMMMMN/                          .hMMMMMMd`  '));
  console.log(chalk.red('  `mMMMMMMh`                          -s/+MMMMMMd` '));
  console.log(chalk.red('  yMMMMMMh                        `:yNMMMs/MMMMMMy '));
  console.log(chalk.red(' :MMMMMMm`                       `hMMMMMMMsoMMMMMM-'));
  console.log(chalk.red(' yMMMMMM/                          dMMMMMMM:mMMMMMy'));
  console.log(chalk.red(' NMMMMMN`                          oMyossss:sMMMMMm'));
  console.log(chalk.red(' MMMMMMN                           yM:NMMMMyoMMMMMN'));
  console.log(chalk.red(' mMMMMMM`                         :Md+MMMMMoyMMMMMm'));
  console.log(chalk.red(' yMMMMMM+                        :NN+NMMMMM-NMMMMMy'));
  console.log(chalk.red(' :MMMMMMN:-                    `sMdyMNymMMosMMMMMM-'));
  console.log(chalk.red('  yMMMMMMd/o`                .oNdhmMhhMmh++MMMMMMy '));
  console.log(chalk.red('  `dMMMMMMm+do.-         ./oyhhhNNhyNMMNosMMMMMMd` '));
  console.log(chalk.red('   `dMMMMMMMssNdhsoo+/+oyyyydMmhhhMMMNs+mMMMMMMd`  '));
  console.log(chalk.red('    `yMMMMMMMNyydMNddddddddddhmMMMMho+dMMMMMMMy`   '));
  console.log(chalk.red('      :mMMMMMMMMmhhhdNMMMMMMMMmhssohMMMMMMMMm:     '));
  console.log(chalk.red('        /mMMMMMMMMMMNdhyyyyyyyhmMMMMMMMMMMm/       '));
  console.log(chalk.red('          :yNMMMMMMMMMMMMMMMMMMMMMMMMMMNy:         '));
  console.log(chalk.red('             :sdMMMMMMMMMMMMMMMMMMMMds:            '));
  console.log(chalk.red('                `-/oyhdmNNNNmdhyo/-                '));
  console.log();
  console.log(chalk.white('                      __________'));
  console.log(chalk.white('                  __ / / __/ __/'));
  console.log(chalk.white('                 / // /\\ \\_\\ \\  '));
  console.log(chalk.white('                 \\___/___/___/'));
  console.log();

  // gratuitous pause to admire the ascii art :p
  setTimeout(() => {
    console.log(`JSS application ${chalk.green(name)} is ready!`);
    console.log();
    console.log(chalk.yellow('Next steps:'));
    nextStepsArray.forEach((step) => console.log(step));
    console.log();
    console.log(chalk.green('Enjoy!'));
  }, 2000);
}
