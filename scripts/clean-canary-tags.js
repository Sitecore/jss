const { execSync } = require('child_process');

// prune local tags
execSync('git fetch origin --prune --prune-tags', { stdio: 'inherit' });

// fetch all tags from repository
execSync('git fetch --all --tags -f', { stdio: 'inherit' });

const output = execSync('git tag', {
  encoding: 'utf-8',
});

const tags = output
  .split('\n')
  .filter((tag) => tag.includes('-canary'))
  .join(' ');

if (!tags.length) {
  console.log('No tags to remove!');
  return;
}

// remove local tags
execSync(`git tag -d ${tags}`, {
  stdio: 'inherit',
});

// remove remote tags
execSync(`git push -d origin ${tags}`, { stdio: 'inherit' });
