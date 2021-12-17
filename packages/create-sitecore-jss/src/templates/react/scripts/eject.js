const crossSpawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');

/* eslint-disable no-console */

const SOURCE_PATH = path.resolve(__dirname, '../scripts');

fs.removeSync(SOURCE_PATH);

console.log('=================COMMIT BEFORE EJECT=================');
crossSpawn.sync('git add .', {
  stdio: 'inherit',
});
crossSpawn.sync('git commit -am "Save before eject"', {
  stdio: 'inherit',
});
crossSpawn.sync('npm run eject', {
  stdio: 'inherit',
});
