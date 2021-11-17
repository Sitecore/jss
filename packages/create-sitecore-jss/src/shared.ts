import glob from 'glob';
import { Answers } from 'inquirer';
import path from 'path';
import { renderFile } from 'ejs';
import fs from 'fs-extra';
import chalk from 'chalk';

export const transformFiles = (templatePath: string, answers: Answers) => {
  // get absolute path for destination of app
  const destinationPath = path.resolve(answers.destination);

  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  files.forEach((file) => {
    // if the directory doesn't exist, create it
    fs.mkdirsSync(path.dirname(`${destinationPath}\\${file}`));

    renderFile(path.join(templatePath, file), answers, (err, str) => {
      if (err) {
        console.error(chalk.red(err));
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
