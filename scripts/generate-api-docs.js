const { execSync } = require('child_process');

execSync('lerna run generate-docs --since=origin/dev', { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Update API docs [skip CI]"', { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
