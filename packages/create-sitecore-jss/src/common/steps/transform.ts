import chalk from 'chalk';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import { Data, render, renderFile } from 'ejs';
import { prompt } from 'inquirer';
import {
  getPascalCaseName,
  getAppPrefix,
  openPackageJson,
  sortKeys,
  writeFileToPath,
} from '../utils/helpers';
import { diffLines, diffJson, Change } from 'diff';
import { BaseArgs } from '../args/base';

const COPY_ONLY_REGEX = /\.(gif|jpg|jpeg|tiff|png|svg|ashx|ico|pdf|jar|html)$/;

export type JsonPropertyType = number | string | (number | string)[] | JsonObjectType;
export interface JsonObjectType {
  [key: string]: JsonPropertyType;
}

export const transformFilename = (file: string, args: BaseArgs): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in args) {
    const value = args[key];
    if (typeof value !== 'string') continue;

    file = file.replace(`{{${key}}}`, value);
  }
  return file;
};

export const merge = (targetObj: JsonObjectType, sourceObj: JsonObjectType): string => {
  const mergeObject = (target: JsonObjectType, source: JsonObjectType) => {
    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = target[key];

      if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
        // use Set to remove duplicates from arrays
        target[key] = [...new Set([...targetVal, ...sourceVal])];
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

  const result = JSON.stringify(mergeObject(targetObj, sourceObj), null, 2);
  return result;
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

  diff.forEach((change: Change) => {
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

export const diffAndWriteFiles = async ({
  rendered,
  pathToNewFile,
  destinationPath,
  answers,
  file,
}: {
  rendered: string;
  pathToNewFile: string;
  destinationPath: string;
  answers: BaseArgs;
  file: string;
}) => {
  const choice = await diffFiles(rendered, transformFilename(pathToNewFile, answers));
  const destination = `${destinationPath}\\${transformFilename(file, answers)}`;
  switch (choice) {
    case 'yes':
      writeFileToPath(destination, rendered);
      return;
    case 'yes to all':
      // set force to true so diff is not run again
      answers.force = true;
      writeFileToPath(destination, rendered);
      return;
    case 'skip':
      return;
    case 'abort':
      console.log(chalk.yellow('Goodbye!'));
      return process.exit();
    // eslint-disable no-fallthrough
    case '':
      // writeFile to default case so that when an initializer is
      // run for the first time, it will still copy files that
      // do not return a diff.
      writeFileToPath(destination, rendered);
      return;
    default:
      return;
  }
};

export const transform = async (
  templatePath: string,
  answers: BaseArgs,
  options: { filter?: (filePath: string) => boolean } = {}
) => {
  const destinationPath = path.resolve(answers.destination);

  if (!answers.appPrefix) {
    answers.appPrefix = false;
  }

  // pass in helper to answers object
  const ejsData: Data = {
    ...answers,
    helper: {
      getPascalCaseName: getPascalCaseName,
      getAppPrefix: getAppPrefix,
    },
  };

  // the templates to be run through ejs render or copied directly
  // depending on the options.filter
  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  for (const file of files) {
    try {
      const pathToNewFile = `${destinationPath}\\${file}`;
      const pathToTemplate = path.join(templatePath, file);

      if (options.filter && !options.filter(pathToTemplate)) {
        continue;
      }
      // holds the content to be written to the new file
      let str: string | undefined;

      // if the directory doesn't exist, create it
      fs.mkdirsSync(path.dirname(transformFilename(pathToNewFile, answers)));

      if (file.match(COPY_ONLY_REGEX)) {
        // pdfs may have <% encoded, which throws an error for ejs.
        // we simply want to copy file if it's a pdf, not render it with ejs.
        fs.copySync(pathToTemplate, pathToNewFile);
        continue;
      }

      if (file.endsWith('package.json') && fs.existsSync(pathToNewFile)) {
        // we treat package.json a bit differently
        // read the current package.json and the partial (templatePkg)
        // merge them and set the result to str which will then go through diff
        // and use ejs render instead of renderFile
        const currentPkg = openPackageJson(pathToNewFile);
        const templatePkg = openPackageJson(pathToTemplate);
        str = merge(currentPkg, templatePkg);
      }

      str = str ? render(str, ejsData) : await renderFile(path.resolve(pathToTemplate), ejsData);

      if (!answers.force) {
        await diffAndWriteFiles({
          rendered: str,
          pathToNewFile,
          destinationPath,
          answers,
          file,
        });
      } else {
        writeFileToPath(`${destinationPath}\\${transformFilename(file, answers)}`, str);
      }
    } catch (error) {
      console.log(chalk.red(error));
      console.log(`Error occurred when trying to render to ${chalk.yellow(path.resolve(file))}`);
    }
  }
};
