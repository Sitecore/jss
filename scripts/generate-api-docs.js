const { execSync } = require('child_process');

execSync('npx lerna run generate-docs --since=origin/dev', { stdio: 'inherit' });
execSync('git add ./ref-docs/**/*', { stdio: 'inherit' });
execSync('git commit -m "Update API docs [skip ci]"', { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
