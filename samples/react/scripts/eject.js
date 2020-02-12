const crossSpawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');

const SOURCE_PATH = path.resolve(__dirname, '../scripts')
const COPY_PATH = path.resolve(__dirname, '../scripts-copy')

fs.removeSync(SOURCE_PATH);

crossSpawn.sync('git add .');
crossSpawn.sync(`npm run eject`, {
  stdio: 'inherit',
});

fs.moveSync(COPY_PATH, SOURCE_PATH);
