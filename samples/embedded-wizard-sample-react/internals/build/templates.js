const fsExtra = require('fs-extra');
const path = require('path');

/*
  TEMPLATE DEPLOYMENT

  Deploys static templates needed for dev server and static builds where the root app HTML isn't done via react
  (i.e. the ServerHtml component)
*/
module.exports = function(outputPath, distPath) {
  fsExtra.ensureDirSync(outputPath);

  // TODO: this would be better in the future if it shared the ServerHtml template
  // instead of using its own static template

  const templatesPath = path.resolve(process.cwd(), './internals/build/templates')
  const files = fsExtra.readdirSync(templatesPath);

  for(let file of files) {
    let fileContents = fsExtra.readFileSync(path.join(templatesPath, file), 'utf8');

    fileContents = fileContents.replace(/\$\(distPath\)/g, distPath);

    fsExtra.writeFileSync(path.join(outputPath, path.basename(file)), fileContents, 'utf8');
  }
}