import chalk from 'chalk';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import { renderFile } from 'ejs';
import { prompt } from 'inquirer';
import { Answer } from '../Answer';
import { getPascalCaseName, openPackageJson, sortKeys } from '../utils/helpers';
import { diffLines, diffJson, Change } from 'diff';

export type JsonPropertyType = number | string | (number | string)[] | JsonObjectType;
export interface JsonObjectType {
  [key: string]: JsonPropertyType;
}

export const transformFilename = (file: string, answers: Answer): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in answers) {
    file = file.replace(`{{${key}}}`, answers[key]);
  }
  return file;
};

export const merge = (targetObj: JsonObjectType, sourceObj: JsonObjectType): string => {
  const mergeObject = (target: JsonObjectType, source: JsonObjectType) => {
    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = target[key];

      if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
        target[key] = targetVal.concat(sourceVal);
      } else if (
        !Array.isArray(targetVal) &&
        !Array.isArray(sourceVal) &&
        typeof targetVal === 'object' &&
        typeof sourceVal === 'object'
      ) {
        target[key] = sortKeys(mergeObject(targetVal, sourceVal));
      } else {
        target[key] = sourceVal;
      }
    }

    return target;
  };

  return JSON.stringify(mergeObject(targetObj, sourceObj), null, 2);
};

/**
 * @param {string} sourceFileContent transformed version of our template
 * @param {string} targetFilePath user's file path
 */
export const diffFiles = async (
  sourceFileContent: string,
  targetFilePath: string
): Promise<string> => {
  if (!fs.pathExistsSync(targetFilePath)) return '';

  const targetFileContents = fs.readFileSync(path.resolve(process.cwd(), targetFilePath), 'utf8');

  if (targetFileContents === sourceFileContent) return '';

  const diff = targetFilePath.endsWith('.json')
    ? diffJson(JSON.parse(targetFileContents), JSON.parse(sourceFileContent))
    : diffLines(targetFileContents, sourceFileContent);

  diff.forEach(async (change: Change) => {
    const color = change.added ? chalk.green : change.removed ? chalk.red : chalk.gray;
    const prefix = change.added ? '+' : change.removed ? '-' : '=';

    change.value.split('\n').forEach((value) => {
      if (!value) return;

      console.log(color(`${prefix} ${value}`));
    });
  });
  // TODO - enhancement: Write 'pagination' function that prints off
  // only x lines and prints remaining x lines on user input.
  // allow user to move forward and back like when piping to more in bash
  // examples of more: https://shapeshed.com/unix-more/#what-is-the-more-command-in-unix

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

export const transformPostInitializer = async ({
  rendered,
  pathToNewFile,
  destinationPath,
  answers,
  file,
}: {
  rendered: string;
  pathToNewFile: string;
  destinationPath: string;
  answers: Answer;
  file: string;
}) => {
  const choice = await diffFiles(rendered, transformFilename(pathToNewFile, answers));
  switch (choice) {
    case 'yes':
      fs.writeFileSync(
        `${destinationPath}\\${transformFilename(file, answers)}`,
        rendered,
        'utf-8'
      );
      return;
    case 'yes to all':
      // empty answers so diffFiles() won't be run again
      answers.yes = true;
      fs.writeFileSync(
        `${destinationPath}\\${transformFilename(file, answers)}`,
        rendered,
        'utf-8'
      );
      return;
    case 'skip':
      return;
    case 'abort':
      console.log(chalk.yellow('Goodbye!'));
      process.exit();
    // eslint-disable no-fallthrough
    default:
      return;
  }
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

      if (!str) str = '';

      // if it's a post-initializer, run diffFiles()
      if (answers.post && !answers.yes) {
        transformPostInitializer({
          rendered: str,
          pathToNewFile,
          destinationPath,
          answers,
          file,
        });
      } else {
        fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
      }
    } catch (error) {
      console.log(chalk.red(error));
      console.log(`Error occurred when trying to render to ${chalk.yellow(path.resolve(file))}`);
    }
  }
};
