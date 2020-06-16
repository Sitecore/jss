/*
  YML Linter
  This is a script that runs a linter over the YML files to pickup syntax issues before deployment.
*/

/* eslint-disable no-throw-literal,no-console */

const path = require('path');
var fs = require('fs');
const yamlLint = require('yaml-lint');

console.log("Started to validate the YML Files");

const getAllFiles = function(dirPath, allFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
        }
    })
    return arrayOfFiles;
}

const allDataFiles = getAllFiles('./data/');
for(var i=0; i<allDataFiles.length; i++) {
    var fileName = allDataFiles[i];
    
    if(fileName.indexOf('\\scripts') > -1)
        fileName = fileName.replace('\\scripts', '');

    if(fileName.indexOf('.yml') > -1) {
        console.log('validating YML: ' + fileName);
        yamlLint.lintFile(fileName).then(() => {
            console.log('Valid YML file. > ' + fileName);
        }).catch((error) => {
            console.error('Invalid YML file > ' + fileName + '\n\r', error);
            process.exit(1); // Exit with a failure
        });
    }
}