import glob from 'glob';
import { Answers } from 'inquirer';
import path from 'path';
import { renderFile } from 'ejs';
import fs from 'fs';
import chalk from 'chalk';

export const mkdirp = (dir: string) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e.code === 'EEXIST') return;
    throw e;
  }
};

export const transformFiles = (templatePath: string, answers: Answers) => {
  // get absolute path for destination of app
  const destinationPath = path.resolve(answers.destination);

  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  files.forEach((file) => {
    // if the directory doesn't exist, create it
    mkdirp(path.dirname(`${destinationPath}/${file}`));
    
    renderFile(path.join(templatePath, file), answers, (err, str) => {
      if (err) {
        console.error(chalk.red(err));
      }
      fs.writeFileSync(`${destinationPath}/${transformFilename(file, answers)}`, str, 'utf-8');
    });
  });
};

const transformFilename = (file: string, answers: Answers): string => {
  for (const key in answers) {
    file = file.replace(`{{${key}}}`, answers[key]);
  }
  return file;
}
