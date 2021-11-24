import chalk from 'chalk';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import spawn from 'cross-spawn';
import { renderFile } from 'ejs';
import { Answers, prompt } from 'inquirer';
import { PackageJsonProperty } from './models';
import { diffLines, diffJson, Change } from 'diff';
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';

export const getPascalCaseName = (name: string): string => {
  // handle underscores by converting them to hyphens
  const temp: string[] = name.replace(/_/g, '-').split('-');
  name = temp.map((item: string) => (item = item.charAt(0).toUpperCase() + item.slice(1))).join('');
  return name;
};

const transformFilename = (file: string, answers: Answers): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in answers) {
    file = file.replace(`{{${key}}}`, answers[key]);
  }
  return file;
};

export const openPackageJson = (pkgPath?: string) => {
  const data = fs.readFileSync(path.resolve(pkgPath ? pkgPath : './package.json'), 'utf8');
  return JSON.parse(data);
};

const merge = (currentPkg: PackageJsonProperty, templatePkg: PackageJsonProperty): string => {
  for (const key of Object.keys(templatePkg)) {
    currentPkg[key] = sortKeys(Object.assign(currentPkg[key], templatePkg[key]));
  }
  return JSON.stringify(currentPkg, null, 2);
};

export const diffFiles = async (
  /* transformed version of our template*/ sourceFileContent: string,
  /* user's file*/ targetFilePath: string
): Promise<string> => {
  // return early with empty string if...
  // * the target file path doesn't exist yet,
  // * there is no diff

  if (!fs.pathExistsSync(targetFilePath)) return '';

  const targetFileContents = fs.readFileSync(path.resolve(process.cwd(), targetFilePath), 'utf8');

  if (targetFileContents === sourceFileContent) return '';

  const diff = targetFilePath.endsWith('.json')
    ? diffJson(JSON.parse(targetFileContents), JSON.parse(sourceFileContent))
    : diffLines(targetFileContents, sourceFileContent);
  if (!diff) return '';

  const count = diff.reduce((acc, curr) => (acc += curr.count || 0), 0);
  if (!count) return '';

  // from the jsdiff docs
  diff.forEach(async (change: Change) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = change.added ? chalk.green : change.removed ? chalk.red : chalk.gray;
    const prefix = change.added ? '+' : change.removed ? '-' : '';
    console.log(color(`${prefix} ${change.value}`));
  });
  // TODO - enhancement: Write 'pagination' function that prints off
  // only x lines and prints remaining x lines on user input.
  // allow user to move forward and back like when piping to more in bash
  // examples of more: https://shapeshed.com/unix-more/#what-is-the-more-command-in-unix

  // filename will appear at bottom of diff, then prompt
  console.log(`Showing potential changes in ${chalk.yellow(targetFilePath.replace('/', '\\'))}`);

  const answer = await prompt({
    type: 'list',
    name: 'choice',
    choices: ['yes', 'skip', 'yes to all', 'abort'],
    message: `File ${chalk.yellow(
      targetFilePath.replace('/', '\\')
    )} is about to be overwritten with the above changes. Are you sure you want to continue?`,
  });

  return answer.choice;
};

export const transformFiles = async (templatePath: string, answers: Answers) => {
  // get absolute path for destination of app
  const destinationPath = path.resolve(answers.destination);

  if (!answers.appPrefix) {
    answers.appPrefix = false;
  }

  // pass in helper to answers object
  const ejsData = {
    ...answers,
    helper: {
      getPascalCaseName: getPascalCaseName,
    },
  };

  // the templates to be run through ejs render
  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  for (const file of files) {
    try {
      const pathToNewFile = `${destinationPath}\\${file}`;
      const pathToTemplate = path.join(templatePath, file);
      // holds the content to be written to the new file
      let str: string | undefined;

      // if the directory doesn't exist, create it
      fs.mkdirsSync(path.dirname(pathToNewFile));

      if (file.endsWith('.pdf') || file.endsWith('.png')) {
        // pdfs may have <% encoded, which throws an error for ejs.
        // we simply want to copy file if it's a pdf, not render it with ejs.
        fs.copySync(pathToTemplate, pathToNewFile);
        continue;
      }

      if (file.endsWith('package.json') && fs.existsSync(pathToNewFile)) {
        // we treat package.json a bit differently
        // read the current package.json and the partial (templatePkg)
        // merge them and set the result to str which will then go through diff
        // and avoid the ejs renderFile()
        const currentPkg = openPackageJson(pathToNewFile);
        const templatePkg = openPackageJson(pathToTemplate);
        str = merge(currentPkg, templatePkg);
      }

      str = str ? str : await renderFile(path.resolve(pathToTemplate), ejsData);

      // if it's a post-initializer, run diffFiles()
      if (answers._?.includes('add') && !answers.yes) {
        const choice = await diffFiles(str, transformFilename(pathToNewFile, answers));
        switch (choice) {
          case 'yes':
            fs.writeFileSync(
              `${destinationPath}\\${transformFilename(file, answers)}`,
              str,
              'utf-8'
            );
            continue;
          case 'yes to all':
            // empty answers so diffFiles() won't be run again
            answers._ = [];
            fs.writeFileSync(
              `${destinationPath}\\${transformFilename(file, answers)}`,
              str,
              'utf-8'
            );
            continue;
          case 'skip':
            continue;
          case 'abort':
            console.log(chalk.yellow('Goodbye!'));
            process.exit();
          // eslint-disable no-fallthrough
          default:
            fs.writeFileSync(
              `${destinationPath}\\${transformFilename(file, answers)}`,
              str,
              'utf-8'
            );
            continue;
        }
      } else {
        fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

// TODO: replace any with proper types
export const sortKeys = (obj: any) => {
  const sorted: any = {};
  Object.keys(obj)
    .sort()
    .forEach((key: string) => (sorted[key] = obj[key]));

  return sorted;
};

export const nextSteps = (appName: string) => {
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
  console.log(`JSS application ${chalk.green(appName)} is ready!`);
  console.log();
  console.log(chalk.yellow('Next steps:'));
  console.log('* npm install (or yarn install, etc)');
  console.log(`* Try out your application with ${chalk.green('jss start')}`);
  console.log(`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`);
  console.log('* Enable source control (i.e. git init) (optional)');
  console.log('* Check out the JSS documentation at https://jss.sitecore.com');
  console.log();
  console.log(chalk.green('Enjoy!'));
};

/**
 * @param {string} command
 * @param {string[]} args
 * @param {SpawnSyncOptionsWithStringEncoding} options
 */
export const spawnFunc = (
  command: string,
  args: string[],
  options?: SpawnSyncOptionsWithStringEncoding
) => {
  const result = spawn.sync(command, args, Object.assign({ stdio: 'inherit' }, options));

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The operation failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The operation failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      );
    }
    process.exit(1);
  }

  if (result.status && result.status > 0) {
    process.exit(result.status);
  }
};

/**
 * @param npmArgs
 * @param options
 */
export function runCommand(
  command: string,
  args: string[],
  options?: SpawnSyncOptionsWithStringEncoding
) {
  console.log(`> ${command} ${args.join(' ')}`);
  spawnFunc(command, args, options);
}

/**
 * @param {string} projectFolder
 */
export function installPackages(projectFolder: string) {
  console.log(chalk.cyan('Installing packages...'));

  const lernaPath = path.join(projectFolder, '..', '..');

  if (fs.existsSync(path.join(lernaPath, 'lerna.json'))) {
    console.log(chalk.yellow('Detected development environment. '));

    runCommand('yarn', ['workspaces', 'focus', '--all'], {
      cwd: projectFolder,
      encoding: 'utf8',
    });
  } else {
    runCommand('npm', ['install'], {
      cwd: projectFolder,
      encoding: 'utf8',
    });
  }
}
