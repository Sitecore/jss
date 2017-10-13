// this allows us to use/reference ES6 modules code within node
// i.e. we can require('./some-module') that uses 'export' (ES6) instead of 'module.exports' (CommonJS)
// require('babel-core/register')({
//   presets: ['env', 'stage-0'],
// });

const generateAppManifest = require('@sitecore-jss/sitecore-manifest/generator/generate').default;

const options = {
  compilers: ['babel-core/register'],
  appName: ''
};

options.routeData = routes.home;

process.argv.forEach((value, index, map) => {
  switch (value) {
    case '--files':
      options.srcPath = map[index + 1];
      break;
    case '--outputPath':
      options.outputPath = map[index + 1];
      break;
    case '--appName':
      options.appName = map[index + 1];
      break;
    case '--exclude-items':
      options.excludeItems = true;
      break;
    default:
      break;
  }
});

if (!options.srcPath) {
  console.error('manifest generate', 'please specify src path via "--srcPath" argument');
  return;
}

if (!options.outputPath) {
  console.error('manifest generate', 'please specify output path via "--outputPath" argument');
  return;
}

if (!options.appName) {
  console.error('manifest generate', 'please specify app name via "--appName" argument');
  return;
}

console.log(`generating manifest for 'appName': ${options.appName}, from 'srcPath': ${options.srcPath}, in 'outputPath': ${options.outputPath}`);

generateAppManifest(options)
  .then(output => console.log('*** DONE ***'))
  .catch(err => console.error(err));
