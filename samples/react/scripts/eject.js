const crossSpawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');

const SOURCE_PATH = path.resolve(__dirname, '../scripts')

fs.removeSync(SOURCE_PATH);

crossSpawn.sync('git add .');
crossSpawn.sync('git commit -am "Save before eject"');
crossSpawn.sync(`npm run eject`, {
  stdio: 'inherit',
});
