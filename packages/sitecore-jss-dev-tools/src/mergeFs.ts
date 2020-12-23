import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const IS_HIDDEN_FILE = (file: string): boolean => path.basename(file).startsWith('.');

const tryParseJsonOrYaml = (jsonString: string) => {
  try {
    const json = yaml.safeLoad(jsonString);
    // handle non-exception-throwing cases
    if (json && typeof json === 'object' && json !== null) {
      return json;
    }
  } catch (e) {
    console.error(e);
  }

  return false;
};

export interface FileResult {
  filename: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents: any;
}

export type CustomFileParser = (filePath: string, contents: string) => unknown | null;

const processFileSync = (
  filePath: string,
  parseFileContents?: CustomFileParser
): FileResult | null => {
  // if no encoding is specified, readFileSync returns a buffer instead of a string
  const contents = fs.readFileSync(filePath, 'utf8');
  if (contents) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contentObject: any;

    if (parseFileContents) {
      contentObject = parseFileContents(filePath, contents);
    }

    if (!contentObject) {
      contentObject = tryParseJsonOrYaml(contents);
    }

    if (contentObject) {
      return {
        filename: path.basename(filePath),
        path: path.resolve(filePath),
        contents: contentObject,
      };
    }
  }
  return null;
};

interface ReadDirSyncResult {
  filesList: string[];
  dirList: string[];
}

const readDirSync = (dir: string) => {
  const result: ReadDirSyncResult = {
    filesList: [],
    dirList: [],
  };

  if (IS_HIDDEN_FILE(dir)) {
    return result;
  }

  const list = fs.readdirSync(dir);
  if (!list) {
    return result;
  }

  list.forEach((file: string) => {
    const filePath = path.join(dir, file);

    if (IS_HIDDEN_FILE(file)) {
      return;
    }

    const stats = fs.statSync(filePath);

    if (stats && stats.isDirectory()) {
      result.dirList.push(filePath);
    } else {
      result.filesList.push(filePath);
    }
  });

  return result;
};

const walkSync = (dir: string, parseFileContents?: CustomFileParser, depth = 0) => {
  const results: MergeFsResult = {
    path: path.resolve(dir),
    name: path.basename(dir),
    files: [],
    folders: [],
  };

  const { filesList, dirList } = readDirSync(dir);

  results.files = filesList
    .map((file) => processFileSync(file, parseFileContents))
    .filter((file) => file)
    .map((file) => file as FileResult);

  results.folders = dirList.map((dirPath) => walkSync(dirPath, parseFileContents, depth + 1));

  return results;
};

export interface MergeFsResult {
  path: string;
  name: string;
  files: FileResult[];
  folders: MergeFsResult[];
}

export const mergeFs = (
  rootPath: string,
  parseFileContents?: CustomFileParser
): Promise<MergeFsResult> =>
  new Promise((resolve, reject) => {
    if (!rootPath) {
      reject(new Error('rootPath is not defined'));
    }
    const result = walkSync(rootPath, parseFileContents);
    if (result) {
      resolve(result);
    } else {
      reject(new Error('no result generated'));
    }
  });
