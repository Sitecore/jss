const del = require('del');
const options = {};

/*
  Helper used in npm scripts to clean a directory
  Before building to it
*/

process.argv.forEach((value, index, map) => {
  switch (value) {
    case '--path':
      options.path = map[index + 1];
      break;
    default:
      break;
  }
});

if (!options.path) {
  console.error('clean', 'please specify path via "--path" argument');
  return;
}

console.log(`cleaning path ${options.path}`);

del([`${options.path}/**`, `!${options.path}`])
  .then((paths) => {
    console.log('cleaned:\n', paths.join('\n'));
  });
