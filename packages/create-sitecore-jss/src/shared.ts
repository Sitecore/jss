import glob from 'glob';
import { Answers, prompt } from 'inquirer';
import path from 'path';
import { renderFile } from 'ejs';
import fs from 'fs-extra';
import chalk from 'chalk';
import { diffLines, Change } from 'diff';

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

export const diffFiles = async (/*transformed version of our template*/sourceFileContent: string, /*user's file*/ targetFilePath: string) => {
  // console.log('sourceFile, targetFile: ', sourceFile, targetFile);
  
  if (sourceFileContent.endsWith('.pdf') || sourceFileContent.endsWith('.png')) return;

  if (fs.pathExistsSync(targetFilePath)) {

    const targetFileContents = fs.readFileSync(path.resolve(process.cwd(), targetFilePath), 'utf8');
    const diff = diffLines(targetFileContents, sourceFileContent, { ignoreWhitespace: true});

    console.log('diff: ', diff);
    // from the docs...
    diff.forEach(async (change: Change) => {
      // green for additions, red for deletions
      // grey for common parts
      const color = change.added ? chalk.green :
      change.removed ? chalk.red : chalk.gray;
      console.log(color(change.value));
      
    //   if (change.added || change.removed) {
    // }
    });

    console.log(`Showing potential changes in ${targetFilePath}`)

    const answer = await prompt({
      type: 'list',
      name: 'choice',
      choices: ['yes', 'yes to all', 'skip', 'abort'],
      message: `File ${chalk.yellow(targetFilePath)} is about to be overwritten with the above changes. Are you sure you want to continue?`,
    });

    if (answer.choice === 'abort') {
      console.log(chalk.yellow('Goodbye!'));
      process.exit();
    }; 
  }
};

export const transformFiles = async (templatePath: string, answers: Answers) => {
  // get absolute path for destination of app
  const destinationPath = path.resolve(answers.destination);
  
  // pass in helper to answers object
  const ejsData = {
    ...answers,
    helper: {
      getPascalCaseName: getPascalCaseName,
    },
  };
  
  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  for (const file of files) {
    try {
      const pathToNewFile = `${destinationPath}\\${file}`
      const pathToTemplate = path.join(templatePath, file);
      
      // if the directory doesn't exist, create it
      fs.mkdirsSync(path.dirname(pathToNewFile));
  
      if (!answers.appPrefix) {
        answers.appPrefix = false;
      };
  
            
      const str = await renderFile(pathToTemplate, ejsData);

      if (file.endsWith('.pdf')) {
        // pdfs may have <% encoded, which throws an error for ejs.
        // we simply want to copy file if it's a pdf, not render it with ejs.
        fs.copySync(pathToTemplate, pathToNewFile);
        return;
      };

      if (answers._?.includes('add')) {
          await diffFiles(str, transformFilename(pathToNewFile, answers));
      };

      fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
      
  
    } catch (error) {
      console.log(chalk.red(error));
    }
  };
};

export const openPackageJson = () => {
  const data = fs.readFileSync(path.resolve('./', 'package.json'), 'utf8');
  return JSON.parse(data);
};

export const install = () => {
  // TODO: write install feature, npm install for customers, yarn install for us
  
}