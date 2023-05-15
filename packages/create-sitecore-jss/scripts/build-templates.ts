import path from 'path';
import fs from 'fs-extra';
const templatesFolder = path.resolve(__dirname, '../src/templates');
const distFolder = path.resolve(__dirname, '../dist/templates');

// Copy templates to dist
fs.copy(templatesFolder, distFolder, (err: Error) => {
  if (err) {
    console.log('An error occurred while copying the folder.');
    throw err;
  }
});
