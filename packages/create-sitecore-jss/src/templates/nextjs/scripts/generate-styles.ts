import fs from 'fs';
import path from 'path';
import { generateProjectStyles } from './templates/project-styles';
import { getProjectList, projectRootPath } from './utils';

const appFilePath = path.resolve(__dirname, '../src/pages/_app.tsx');

const appFile = fs.readFileSync(appFilePath, 'utf-8');

const projects = getProjectList(projectRootPath);

const styles = generateProjectStyles(projects);

const updatedAppFile = appFile.replace(
  /\/\/ STYLES_START([\s\S]*?)\/\/ STYLES_END/g,
  `\/\/ STYLES_START\n${styles}\n\/\/ STYLES_END`
);

fs.writeFileSync(appFilePath, updatedAppFile, {
  encoding: 'utf8',
});
