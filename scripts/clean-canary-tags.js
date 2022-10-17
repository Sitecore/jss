const { execSync } = require('child_process');

// prune local tags
execSync('git fetch origin --prune --prune-tags', { stdio: 'inherit' });

// fetch all tags from repository
execSync('git fetch --all --tags -f', { stdio: 'inherit' });

const output = execSync('git tag', {
  encoding: 'utf-8',
});

const tags = output.split('\n').filter((tag) => tag.includes('-canary'));

if (tags.length === 0) {
  console.log('No tags to remove!');
  return;
}

// Avoid "The command line is too long" errors by batching
const batchSize = 100;
for (let i = 0; i < tags.length; i += batchSize) {
  const batchTags = tags.slice(i, i + batchSize);

  // remove local tags
  execSync(`git tag -d ${batchTags.join(' ')}`, {
    stdio: 'inherit',
  });

  // remove remote tags
  execSync(`git push -d origin ${batchTags.join(' ')}`, { stdio: 'inherit' });
}
