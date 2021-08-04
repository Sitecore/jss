import path from 'path';
import fs from 'fs';

const EXCLUDE_DIR_REGEXP = /(^|\\)(node_modules|dist|\.next|out|\.generated)(\\|$)/gi;
const INCLUDE_FILE_REGEXP = /\.(js|tsx?)$/i;

/**
 * Generates comments block
 * @param {string} prefix starting part
 * @param {string} [suffix] ending part
 * @returns {RegExp} regExp
 */
const getStripRegExp = (prefix: string, suffix = 'EMPTY') => {
  return new RegExp(`// #${prefix}_${suffix}`, 'g');
};

interface StripSettings {
  /**
   * Strip function starting path
   * @default process.cwd()
   */
  sourcePath?: string;
  /**
   * Custom identificator for comments block in case if you want to have comments with special name
   * @default 'EMPTY'
   */
  suffix?: string;
  /**
   * Should function strip code and comments. By default it will strip only comments.
   * @default false
   */
  stripCode?: boolean;
  /**
   * Pattern to exclude specific directories from iterations
   * @default /(^|\\)(node_modules|dist|\.next|out|\.generated)(\\|$)/gi
   */
  excludeDirPattern?: RegExp;
  /**
   * Pattern to exclude files with specific filename from iterations
   * @default /\.(js|tsx?)$/i
   */
  includeFilePattern?: RegExp;
}

/**
 * Remove part of code which inside the comments block
 * @param {string} file
 * @param {StripSettings} settings
 */
export const compile = (file: string, settings: StripSettings) => {
  const content = fs.readFileSync(file, 'utf8');

  let shouldRemove = false;

  const lines = content.split('\r\n').filter((line) => {
    const isStartLine = getStripRegExp('START', settings.suffix).test(line);
    const isEndLine = getStripRegExp('END', settings.suffix).test(line);

    if (!settings.stripCode) {
      return !(isStartLine || isEndLine);
    }

    if (isStartLine) {
      shouldRemove = true;
    }

    if (isEndLine) {
      shouldRemove = false;

      return shouldRemove;
    }

    return !shouldRemove;
  });

  fs.writeFileSync(file, lines.join('\r\n'));
};

/**
 * Process next file from the specified directory
 * @param {string} dirPath
 * @param {Directory} directory
 * @param {StripSettings} settings
 */
export const processNextFile = (
  dirPath: string,
  directory: Directory,
  settings: StripSettings
): void => {
  let file = directory.getNextFile();

  if (!file) return;

  if ((settings.excludeDirPattern || EXCLUDE_DIR_REGEXP).test(file)) {
    return processNextFile(dirPath, directory, settings);
  }

  file = path.resolve(dirPath, file);

  const stat = fs.statSync(file);

  if (stat && stat.isDirectory()) {
    processDirectory(file, settings);
    processNextFile(dirPath, directory, settings);

    return;
  }

  if (!(settings.includeFilePattern || INCLUDE_FILE_REGEXP).test(file)) {
    return processNextFile(dirPath, directory, settings);
  }

  compile(file, settings);

  processNextFile(dirPath, directory, settings);
};

interface Directory {
  /**
   * Files list in the directory
   */
  files: string[];
  /**
   * Current file index
   */
  index: number;
  /**
   * Returns next file in the directory
   */
  getNextFile(): string;
}

/**
 * Get files list and returns @interface Directory instance
 * @param {string} dir directory path
 * @returns {Directory} instance
 */
export const getDirectory = (dir: string): Directory => {
  const list = fs.readdirSync(dir);

  return {
    files: list,
    index: 0,
    getNextFile() {
      return this.files[this.index++];
    },
  };
};

/**
 * Iterate files/directories in provided directory
 * @param {string} dirPath current directory
 * @param {StripSettings} settings
 */
export const processDirectory = (dirPath: string, settings: StripSettings) => {
  const directory = getDirectory(dirPath);

  processNextFile(dirPath, directory, settings);
};

/**
 * Removes part of code which inside the special comments block.
 * Compiles each not excluded file starting from current dirrectory (or `settings.sourcePath`).
 * @param {StripSettings} settings
 */
export const strip = (settings: StripSettings = {}) => {
  processDirectory(settings.sourcePath || process.cwd(), settings);
};
