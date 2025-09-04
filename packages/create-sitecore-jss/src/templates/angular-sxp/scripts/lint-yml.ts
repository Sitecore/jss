const path = require('path');
const glob = require('glob');
const yamlLint = require('yaml-lint');

const DATA_DIR_PATH = path.resolve(__dirname, '..', './data/');

const files: string[] = glob.sync('**/*.yml', { cwd: DATA_DIR_PATH });

console.log('Linting .yml files...');

let isValid = true;

const promises = files.map(filename => {
  filename = path.resolve(DATA_DIR_PATH, filename);

  return yamlLint.lintFile(filename).catch((e: Error) => {
    console.error(filename);
    console.log('\x1b[31m', 'error', '\x1b[0m', e.message);
    isValid = false;
  });
});

Promise.all(promises).then(() => {
  if (isValid) {
    console.log('All files pass linting.');
    return;
  }

  process.exit(1);
});
