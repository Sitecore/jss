import { existsSync, readdirSync, Stats, statSync } from 'fs';
import { sync as globSync } from 'glob';
import * as nodePath from 'path';

// inspired by 'lookupFiles' method: https://github.com/mochajs/mocha/blob/master/lib/utils.js
export const resolveFiles = ({
  fileGlob,
  extensions,
  recursive,
  workingDirectory,
  allowEmptyGlobs = false,
}: {
  fileGlob: string;
  extensions: string[];
  recursive: boolean;
  workingDirectory: string;
  allowEmptyGlobs?: boolean;
}) => {
  let files: string[] = [];
  let lookupPath = fileGlob;
  const re = new RegExp(`\\.(${extensions.join('|')})$`);

  if (!existsSync(lookupPath)) {
    if (existsSync(`${lookupPath}.js`)) {
      lookupPath += '.js';
    }
    if (existsSync(`${lookupPath}.ts`)) {
      lookupPath += '.ts';
    } else {
      const options: any = {};
      if (workingDirectory) {
        options.cwd = workingDirectory;
      }
      files = globSync(lookupPath, options);
      if (!files.length) {
        if (allowEmptyGlobs) {
          console.warn(`path or pattern '${lookupPath}' did not match any files.`);
        } else {
          throw new Error(`cannot resolve path (or pattern) '${lookupPath}'`);
        }
      }

      return files;
    }
  }

  try {
    const stat = statSync(lookupPath);
    if (stat.isFile()) {
      return lookupPath;
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

export const importModules = ({
  fileGlobs = [],
  workingDirectory = '',
  allowEmptyGlobs = false,
}: {
  fileGlobs: string[];
  workingDirectory?: string;
  allowEmptyGlobs?: boolean;
}) => {
  const resolved = fileGlobs.reduce((initialResult: string[], fileGlob) => {
    let result = initialResult;
    if (fileGlob) {
      result = result.concat(
        resolveFiles({
          fileGlob,
          extensions: ['.js'],
          recursive: true,
          workingDirectory,
          allowEmptyGlobs,
        })
      );
    }
    return result;
  }, []);

  // wrap import() in a function so we can control when the promise starts to resolve.
  // otherwise, promises start to resolve immediately upon creation.
  const modules = resolved.map((file) => ({
    file,
    import: () => import(nodePath.resolve(workingDirectory, file)),
  }));

  return modules;
};

export const initCompilers = async (compilers: string[] = []) => {
  if (!compilers || compilers.length === 0) {
    console.warn('no compilers specified for initCompilers');
    return Promise.resolve();
  }

  const imports = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const compiler of compilers) {
    // not entirely sure why this works... i assume we would need to call .then() after import() and subsequently
    // call the default export of the imported module (assuming it's a function).
    // probably compiler-specific, depending on how they export, something to be aware
    // of if people use something other than `babel-core/register`.
    imports.push(import(compiler));
  }

  return Promise.all(imports);
};
