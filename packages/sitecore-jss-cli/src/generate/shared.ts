import glob from 'glob';
import { IOptions } from 'glob';
import path from 'path';
// import { renderFile } from 'ejs';

export const copyFiles = (templatePath: string, destinationPath: string) => {
  console.log('templatePath: ', templatePath);

  const options: IOptions = { cwd: templatePath, dot: true };
  const files = glob.sync('**/*', options);
  console.log(files, destinationPath);
};

export const getDestinationPath = (relativePath: string): string => {
  // TODO check if path is absolute or relative first
  return path.join(process.cwd(), relativePath);
};
