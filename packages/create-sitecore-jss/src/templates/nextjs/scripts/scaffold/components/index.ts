import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { TemplateArgs, ConfigDirectory } from './utils';
import config from './config';

// Matches component names that start with a capital letter, and contain only letters, number,
// underscores, or dashes. Optionally, the component name can be preceded by a relative path
const nameParamFormat = new RegExp(/^((?:[\w-]+\/)*)([A-Z][\w-]+)$/);

const componentRootPath = 'src/components';

interface ExpandedTemplateArgs extends TemplateArgs {
  [name: string]: unknown;
}

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}

export const scaffoldCommand = async (componentName: string | undefined): Promise<void> => {
  // Get the name
  while (!componentName) {
    await inquirer
      .prompt({
        name: 'componentName',
        message: 'The name for the component to generate?',
      })
      .then((answers) => {
        componentName = answers.componentName;
      });

    const regExResult = nameParamFormat.exec(componentName || '');
    if (regExResult === null) {
      console.log(
        chalk.red(
          `Component name should start with an uppercase letter and contain only letters, numbers, dashes, or underscores. If specifying a path, it must be relative to src/components`
        )
      );
      componentName = undefined;
    }
  }

  // Get the directory chain
  let directoryOptions: ConfigDirectory[] = config.directories;
  const directories: ConfigDirectory[] = [];
  let prompt = 'directory';

  while (directoryOptions.length > 0) {
    let directory = directoryOptions[0];

    if (directoryOptions.length > 1) {
      await inquirer
        .prompt({
          name: 'directory',
          type: 'list',
          message: `What ${prompt} should the component be created in?`,
          choices: directoryOptions,
        })
        .then((answers) => {
          directory = directoryOptions?.find((_) => _.name === answers.directory) || directory;
        });
    }

    directories.push(directory);
    prompt = `subdirectory of ${chalk.yellow(directory.name)}`;
    directoryOptions = directory.directories || [];
  }

  let templateArgs: ExpandedTemplateArgs = {
    componentName,
    directories,
  };

  // Questions
  if (config.questions) {
    await inquirer.prompt(config.questions).then((answers) => {
      templateArgs = {
        ...templateArgs,
        ...answers,
      };
    });
  }

  // Pass any additional directory parameters to the templates
  for (const directory of directories) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, path, directories, templates, ...rest } = directory;
    templateArgs = {
      ...templateArgs,
      ...rest,
    };
  }

  // Add any additional templates defined at the directory level
  let templates = {
    ...config.templates,
  };
  for (const directory of directories) {
    templates = {
      ...templates,
      ...directory.templates,
    };
  }

  // Output directory
  let outputDir = componentRootPath;
  for (const directory of directories) {
    outputDir = path.join(outputDir, directory.path);
  }

  if (Object.keys(templates).length > 1) {
    outputDir = path.join(outputDir, componentName);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  // Generate files
  const created: string[] = [];
  for (const name of Object.keys(templates)) {
    const fileName = name.replace('[name]', componentName);
    const filePath = path.join(outputDir, fileName);

    if (fs.existsSync(filePath)) {
      const { overwrite } = await inquirer.prompt({
        name: 'overwrite',
        type: 'confirm',
        message: `The file ${chalk.yellow(fileName)} already exists, overwrite?`,
      });

      if (!overwrite) {
        continue;
      }
    }

    const templateContent = editLineEndings(templates[name](templateArgs));

    fs.writeFileSync(filePath, templateContent, 'utf8');
    created.push(filePath);
    console.log(`Scaffolding of ${chalk.green(fileName)} complete.`);
  }

  if (created.length > 0) {
    console.log('');
    console.log(chalk.green('Next steps:'));
    for (const file of created) {
      console.log(`* Implement ${chalk.green(file)}`);
    }
  }
};
