const { execSync } = require('child_process');

execSync('npx lerna run generate-docs --since=origin/dev', { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Update API docs"', { stdio: 'inherit' });
