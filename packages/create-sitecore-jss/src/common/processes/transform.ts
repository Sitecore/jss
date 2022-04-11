import chalk from 'chalk';
import fs from 'fs-extra';
import glob from 'glob';
import path, { sep } from 'path';
import { parse } from 'dotenv';
import { Data, renderFile } from 'ejs';
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

const FILE_FOR_COPY_REGEXP = /(index\.html)$|\.(gif|jpg|jpeg|tiff|png|svg|ashx|ico|pdf|jar)$/;

export type JsonPropertyType = number | string | (number | string)[] | JsonObjectType;
export type JsonObjectType = {
  [key: string]: JsonPropertyType;
};

export const transformFilename = (file: string, args: BaseArgs): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in args) {
    const value = args[key];
    if (typeof value !== 'string') continue;

    file = file.replace(`{{${key}}}`, value);
  }
  return file;
};

export const merge = (targetObj: JsonObjectType, sourceObj: JsonObjectType): JsonObjectType => {
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

  return mergeObject(targetObj, sourceObj);
};

export const concatEnv = (targetContent: string, sourceContent: string): string => {
  const env = parse(sourceContent);
  if (
    env &&
    Object.keys(env).length > 0 &&
    Object.keys(env).every((value) => targetContent.includes(value))
  ) {
    // Don't add if the target already contains every .env value
    return targetContent;
  }
  // NOTE we are enforcing CRLF for the repo in .gitattributes, so match it here
  const eol = '\r\n';
  return targetContent + eol + sourceContent;
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
  answers,
}: {
  rendered: string;
  pathToNewFile: string;
  answers: BaseArgs;
}) => {
  const targetFilePath = transformFilename(pathToNewFile, answers);
  const choice = await diffFiles(rendered, targetFilePath);

  switch (choice) {
    case 'yes':
      writeFileToPath(targetFilePath, rendered);
      return;
    case 'yes to all':
      // set force to true so diff is not run again
      answers.force = true;
      writeFileToPath(targetFilePath, rendered);
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
      writeFileToPath(targetFilePath, rendered);
      return;
    default:
      return;
  }
};

type TransformOptions = {
  /**
   * Determines whether a file should be copied only (not rendered through ejs)
   * Can be used if you need additional logic instead of just using `fileForCopyRegExp`
   * @param {string} file path to a file
   * @param {RegExp} fileForCopyRegExp default RegExp used for determination
   */
  isFileForCopy?: (file: string, fileForCopyRegExp: RegExp) => boolean;
  /**
   * Determines whether a file should be skiped (not copied/rendered).
   * @param {string} file path to a file
   */
  isFileForSkip?: (file: string) => boolean;
  /**
   * Custom RegExp to determine which files should be copied only (not rendered through ejs)
   * @default FILE_FOR_COPY_REGEXP
   */
  fileForCopyRegExp?: RegExp;
};

/**
 * Handles each template file and applies ejs renderer, also:
 * * determines files for copy
 * * determines files for skip
 * * if some files already exist:
 *   * merges package.json files
 *   * concatenates .env files
 *   * compares diffs
 * @param {string} templatePath path to the template
 * @param {BaseArgs} answers CLI arguments
 * @param {TransformOptions} options custom options
 */
export const transform = async (
  templatePath: string,
  answers: BaseArgs,
  options: TransformOptions = {}
) => {
  const { isFileForCopy, isFileForSkip, fileForCopyRegExp = FILE_FOR_COPY_REGEXP } = options;

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
  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  for (const file of files) {
    try {
      let pathToNewFile = `${destinationPath}${sep}${file}`;
      const pathToTemplate = path.join(templatePath, file);

      // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
      // See: https://github.com/npm/npm/issues/1862
      if (!file.endsWith('.gitignore') && file.endsWith('gitignore')) {
        pathToNewFile = pathToNewFile.replace(/\gitignore$/, '.gitignore');
      }

      if (isFileForSkip && isFileForSkip(file)) {
        continue;
      }

      // holds the content to be written to the new file
      let str: string | undefined;

      // if the directory doesn't exist, create it
      fs.mkdirsSync(path.dirname(transformFilename(pathToNewFile, answers)));

      if (isFileForCopy ? isFileForCopy(file, fileForCopyRegExp) : file.match(fileForCopyRegExp)) {
        // pdfs may have <% encoded, which throws an error for ejs.
        // we simply want to copy file if it's a pdf, not render it with ejs.
        fs.copySync(pathToTemplate, pathToNewFile);
        continue;
      }

      if (file.endsWith('package.json') && fs.existsSync(pathToNewFile)) {
        // we treat package.json a bit differently
        // read the current package.json and the template package.json (rendered with ejs)
        const currentPkg = openPackageJson(pathToNewFile);
        const templatePkg = JSON.parse(await renderFile(path.resolve(pathToTemplate), ejsData));
        // merge them and set the result to str which will then go through diff
        const merged = merge(currentPkg, templatePkg);
        str = JSON.stringify(merged, null, 2);
      }

      if (file.endsWith('.env') && fs.existsSync(pathToNewFile)) {
        // we treat .env files a bit differently
        // read the current .env and the template .env (rendered with ejs)
        const currentDotEnv = fs.readFileSync(path.resolve(process.cwd(), pathToNewFile), 'utf8');
        const templateDotEnv = await renderFile(path.resolve(pathToTemplate), ejsData);
        // concatenate them and set the result to str which will then go through diff
        str = concatEnv(currentDotEnv, templateDotEnv);
      }

      str = str ?? (await renderFile(path.resolve(pathToTemplate), ejsData));

      if (!answers.force) {
        await diffAndWriteFiles({
          rendered: str,
          pathToNewFile,
          answers,
        });
      } else {
        writeFileToPath(transformFilename(pathToNewFile, answers), str);
      }
    } catch (error) {
      console.log(chalk.red(error));
      console.log(`Error occurred when trying to render to ${chalk.yellow(path.resolve(file))}`);
    }
  }
};
