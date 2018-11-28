import { existsSync, readdirSync, Stats, statSync } from 'fs-extra';
import * as glob from 'glob';
import importFresh from 'import-fresh';
import * as nodePath from 'path';

export interface ResolveFilesArgs {
  fileGlob: string;
  extensions: string[];
  recursive: boolean;
  workingDirectory: string;
}
// inspired by 'lookupFiles' method: https://github.com/mochajs/mocha/blob/master/lib/utils.js
export const resolveFiles = ({ fileGlob, extensions, recursive, workingDirectory }: ResolveFilesArgs) => {
  let files: string[] = [];
  let lookupPath = fileGlob;
  const re = new RegExp(`\\.(${extensions.join('|')})$`);

  if (!existsSync(lookupPath)) {
    if (existsSync(`${lookupPath}.js`)) {
      lookupPath += '.js';
    } else {
      const options: any = {};
      if (workingDirectory) {
        options.cwd = workingDirectory;
      }
      files = glob.sync(lookupPath, options);

      return files;
    }
  }

  try {
    const stat = statSync(lookupPath);
    if (stat.isFile()) {
      return [nodePath.resolve(lookupPath)];
    }
  } catch (err) {
    // ignore error
    return [];
  }

  readdirSync(lookupPath).forEach((file) => {
    const filePath = nodePath.join(lookupPath, file);
    let stat: Stats;
    try {
      stat = statSync(filePath);
      if (stat.isDirectory()) {
        if (recursive) {
          files = files.concat(
            resolveFiles({ fileGlob: filePath, extensions, recursive, workingDirectory })
          );
        }
        return;
      }
    } catch (err) {
      // ignore error
      return;
    }

    if (!stat.isFile() || !re.test(filePath) || nodePath.basename(filePath)[0] === '.') {
      return;
    }

    const resolvedPath = nodePath.resolve(filePath);
    files.push(resolvedPath);
  });

  return files;
};

export const importModules = ({ fileGlobs = [], workingDirectory = '' }: { fileGlobs: string[], workingDirectory?: string }) => {
  let resolved: string[] = [];
  fileGlobs.forEach((fileGlob) => {
    resolved = resolved.concat(
      resolveFiles({ fileGlob, extensions: ['.js'], recursive: true, workingDirectory })
    );
  });

  if (!resolved.length) {
    console.warn(`No files matched any of the source patterns: '${fileGlobs.join(', ')}'`);
    return [];
  }

  // wrap import() in a function so we can control when the promise starts to resolve.
  // otherwise, promises start to resolve immediately upon creation.
  const modules = resolved.map((file) => () => importFresh(nodePath.resolve(workingDirectory, file)));
  return modules;
};
