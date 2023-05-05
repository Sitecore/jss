const { execSync } = require('child_process');

execSync('git config --global user.email "builds@sitecore.com"', { stdio: 'inherit' });
execSync('git config --global user.name "Automated Build"', { stdio: 'inherit' });

execSync('npx lerna run generate-docs --since=origin/dev', { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Update API docs [skip CI]"', { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
