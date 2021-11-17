/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import glob, { IOptions } from 'glob';
import { Answers } from 'inquirer';
import path from 'path';
// import { renderFile } from 'ejs';
import fs from 'fs';
// import chalk from 'chalk';

const getAbsolutePath = (destinationPath: string): string => {
  // TODO check if path is absolute or relative first
  // right now it would append cwd onto an absolute path...
  // returns absolute path
  return path.resolve(destinationPath); // returns absolute path
};

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
  const destinationPath = getAbsolutePath(answers.destination);

  const options: IOptions = { cwd: templatePath, dot: true };
  const files = glob.sync('**/*', options);

  // console.log(files, destinationPath);
  // todo, ejs
  files.forEach((file) => {
    mkdirp(path.dirname(`${destinationPath}/${file}`));
    // renderFile(file, answers, (err, str) => {
    //   console.log('str: ', typeof str, str);
    //   if (err) {
    //     console.log(chalk.red(err));
    //   }
    //   // if the directory doesn't exist, create it
    //   fs.writeFileSync(`${destinationPath}/${file}`, Buffer.from(str), 'utf-8');
    // });
  });
};
