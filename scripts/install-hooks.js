const fs = require('fs');

const installHooks = () => {
  // data to be written to the file
  const data = `#!/bin/sh
#
# pre-push hook that runs our linter so we don't have to wait for
# CI to do it for us!
#
# To skip this hook, use the --no-verify flag
# when pushing.
#

echo "Linting packages..."
npm run lint-packages;
echo "Linting samples..."
npm run lint-apps;`;

  // \x1b[32m%s\x1b[0m - set color to green, insert the string, reset color after string is logged to console
  console.log('\x1b[32m%s\x1b[0m', 'Writing to local .git folder...');

  // Write the hook to the local .git folder. Using writeFile in order to catch any errors
  /* eslint-disable no-unused-vars */
  fs.writeFile('./.git/hooks/pre-push', data, 'utf8', (err, _) => {
    if (err) {
      console.log('\x1b[31m%o\x1b[0m', err);
    }
    console.log('\x1b[32m%s\x1b[0m', 'Success!');
  });
};

installHooks();
