import path from 'path';
import fs from 'fs-extra';

const templatesFolder = path.resolve(__dirname, './../src/templates');
const distFolder = path.resolve(__dirname, './../dist');

// Copy templates to dist
fs.copy(templatesFolder, distFolder, function(err: Error) {
  if (err) {
    console.log('An error occurred while copying the folder.');
    return console.error(err);
  }
  console.log(distFolder);
  console.log('Copy completed!');
});
