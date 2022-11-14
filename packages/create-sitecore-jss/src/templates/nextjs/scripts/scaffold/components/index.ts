import inquirer, { Question } from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { ComponentsFolder } from './utils';
import componentConfig from './config';

// Matches component names that start with a capital letter, and contain only letters, number,
// underscores, or dashes. Optionally, the component name can be preceded by a relative path
const nameParamFormat = new RegExp(/^((?:[\w-]+\/)*)([A-Z][\w-]+)$/);

const componentRootPath = 'src/components';

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
 function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}

export const scaffoldCommand = async (componentName: string | undefined) => {
  let answers: any = {
    componentName
  };

  // Get the name
  while (!answers.componentName) {
    await inquirer.prompt({ 
      name: 'componentName',
      message: 'The name for the component to generate?',
    }, answers);

    const regExResult = nameParamFormat.exec(answers.componentName as string);
    if (regExResult === null) {
      console.log(chalk.red(`Component name should start with an uppercase letter and contain only letters, numbers, dashes, or underscores. If specifying a path, it must be relative to src/components`));
      componentName = undefined;
    }
  }

  let componentsFolder = new ComponentsFolder(componentConfig);

  // Get the level
  if (componentsFolder.levels.length > 1) {
    await inquirer.prompt({ 
      name: 'level',
      type: 'list',
      message: 'What level should the component be created at?',
      choices: componentsFolder.levels
    });
  } else {
    answers.level = componentsFolder.levels[0].name;
  }
  const level = componentsFolder.levels.find(_ => _.name === answers.level) || componentsFolder.levels[0];

  // Get the directory
  if (level.directories.length > 1) {
    await inquirer.prompt({ 
      name: 'directory',
      type: 'list',
      message: 'What directory should the component be created in?',
      choices: level.directories
    });
  } else {
    answers.directory = level.directories[0].name;
  }
  const directory = level.directories.find(_ => _.name === answers.directory) || level.directories[0];

  // Validate overwrite

  // Questions
  let questions: Question[] = [];

  if (componentsFolder.questions.length > 0) {
    questions.concat(componentsFolder.questions);
  }
  if (level.questions.length > 0) {
    questions.concat(level.questions);
  }
  if (directory.questions.length > 0) {
    questions.concat(directory.questions);
  }
  if (questions.length > 1) {
    await inquirer.prompt(questions, answers);
  }

  // Output directory
  let outputDir = componentRootPath;
  if (level.path) {
    outputDir = path.join(componentRootPath, level.path);
  }
  outputDir = path.join(outputDir, directory.path);
  fs.mkdirSync(outputDir, { recursive: true });

  // Generate files
  for (const template of directory.templates) {
    const fileName = template.fileName.replace('[name]', answers.componentName);
    const filePath = path.join(outputDir, fileName);

    const templateContent = editLineEndings(template.template(answers));

    fs.writeFileSync(filePath, templateContent, 'utf8');
    console.log(chalk.green(`File ${fileName} has been scaffolded.`));
  }
}
