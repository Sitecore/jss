import glob from 'glob';
import { Answers } from 'inquirer';
import path from 'path';
import { renderFile } from 'ejs';
import fs from 'fs-extra';
import chalk from 'chalk';

export const getPascalCaseName = (name: string): string => {
  // handle underscores by converting them to hyphens
  const temp: string[] = name.replace(/_/g, '-').split('-');
  name = temp.map((item: string) => (item = item.charAt(0).toUpperCase() + item.slice(1))).join('');
  return name;
};

export const transformFiles = (templatePath: string, answers: Answers) => {
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

  files.forEach((file) => {
    // if the directory doesn't exist, create it
    fs.mkdirsSync(path.dirname(`${destinationPath}\\${file}`));

    const pathToTemplate = path.join(templatePath, file);
    renderFile(pathToTemplate, ejsData, (err, str) => {
      if (file.endsWith('.pdf')) {
        // pdfs may have <% encoded, which throws an error for ejs.
        // we simply want to copy file if it's a pdf, not render it with ejs.
        fs.copy(pathToTemplate, `${destinationPath}\\${file}`);
        return;
      }
      if (err) {
        throw chalk.red(err);
      }
      fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
    });
  });
};

const transformFilename = (file: string, answers: Answers): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in answers) {
    file = file.replace(`{{${key}}}`, answers[key]);
  }
  return file;
};

export const openPackageJson = () => {
  const data = fs.readFileSync(path.resolve('./', 'package.json'), 'utf8');
  return JSON.parse(data);
};

// TODO: write install feature, npm install for customers, yarn install for us
