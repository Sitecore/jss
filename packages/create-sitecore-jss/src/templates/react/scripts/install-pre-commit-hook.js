const fs = require('fs');

const installHooks = () => {
  // data to be written to the file
  const data = `#!/bin/sh

#

# pre-commit hook that runs our linter before every commit

#

echo "Running lint check..."
yarn pre-commit`;

  // \x1b[32m%s\x1b[0m - set color to green, insert the string, reset color after string is logged to console
  console.log('\x1b[32m%s\x1b[0m', 'Writing to local .git folder...');

  // Write the hook to the local .git folder. Using writeFile in order to catch any errors
  fs.writeFile('./.git/hooks/pre-commit', data, 'utf8', err => {
    if (err) {
      console.log('\x1b[31m%o\x1b[0m', err);
    }
    console.log('\x1b[32m%s\x1b[0m', 'Success!');
  });
};

installHooks();
