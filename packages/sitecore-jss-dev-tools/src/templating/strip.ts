import path from 'path';
import fs from 'fs';
import glob from 'glob';

const PATTERN = '**/*.@(js|ts?(x))';
const IGNORE_PATTERN = '@(node_modules|dist|.next|out|.generated)/**';

/**
 * Generates comments block
 * @param {string} prefix starting part
 * @param {string} [suffix] ending part
 * @returns {RegExp} regExp
 */
const getStripRegExp = (prefix: string, suffix = 'STRIP') => {
  return new RegExp(`// #${prefix}_${suffix}`, 'g');
};

interface StripSettings {
  /**
   * Custom identificator for comments block in case if you want to have comments with special name
   * @default 'STRIP'
   */
  suffix?: string;
  /**
   * Should function strip code and comments. By default it will strip only comments.
   * @default false
   */
  stripCode?: boolean;
  /**
   * Indicates which files should be included
   * @default '!(node_modules|dist|.next|out|.generated)/**\/*.@(js|ts?(x))'
   */
  pattern?: string;
  /**
   * Indicates which files should be ignored
   * @default '@(node_modules|dist|.next|out|.generated)/**'
   */
  ignore?: string;
  /**
   * Current working directory
   * @default process.cwd()
   */
  cwd?: string;
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
 * Removes part of code which inside the special comments block.
 * Compiles each not excluded file starting from current dirrectory (or `settings.sourcePath`).
 * @param {StripSettings} settings
 */
export const strip = (settings: StripSettings = {}) => {
  const { pattern = PATTERN, ignore = IGNORE_PATTERN, cwd = process.cwd() } = settings;

  const files = glob.sync(pattern, { ignore, cwd });

  files.forEach((file) => compile(path.resolve(cwd, file), settings));
};
