import chalk from 'chalk';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import { renderFile } from 'ejs';
import { prompt } from 'inquirer';
import { Answer } from '../Answer';
import { getPascalCaseName, sortKeys, openPackageJson } from '../utils/helpers';
import { diffLines, diffJson, Change } from 'diff';

export interface PackageJsonProperty {
  [key: string]:
    | string
    | string[]
    | {
        [key: string]: string | string[];
      };
}

export const transformFilename = (file: string, answers: Answer): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in answers) {
    file = file.replace(`{{${key}}}`, answers[key]);
  }
  return file;
};

export const merge = (
  currentPkg: PackageJsonProperty,
  templatePkg: PackageJsonProperty
): string => {
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
    const prefix = change.added ? '+' : change.removed ? '-' : '=';
    change.value.split('\n').forEach((value) => {
      console.log(color(`${prefix} ${value}`));
    });
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

export const transform = async (templatePath: string, answers: Answer) => {
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

      if (
        file.endsWith('package.json') &&
        fs.existsSync(pathToNewFile) &&
        // check if it is a post initializer
        answers.post
      ) {
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
      if (answers.post && !answers.yes) {
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
            answers.yes = true;
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
      console.log(`Error occurred when trying to render to ${chalk.yellow(path.resolve(file))}`);
    }
  }
};
