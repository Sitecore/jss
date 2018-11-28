import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export class FolderSource {
  argv: any;
  destinationPath: string;
  templatePath = '';

  constructor(argv: any, destinationPath: string) {
    this.argv = argv;
    this.destinationPath = destinationPath;
  }

  async getFromSource() {
    this.verifyTemplate();
    this.copyTemplate();
  }

  async verifyTemplate() {
    if (!fs.existsSync(this.argv.source)) {
      console.error(chalk.red(`The source path ${this.argv.source} was not a valid directory.`));
      process.exit(1);
    }

    const templatePath = path.join(this.argv.source, this.argv.template);

    if (!fs.existsSync(templatePath)) {
      console.error(
        chalk.red(
          `The template ${this.argv.template} did not exist in source path ${this.argv.source}.`
        )
      );
      process.exit(1);
    }

    this.templatePath = templatePath;
  }

  copyTemplate() {
    console.log(
      chalk.cyan(`Copying template from ${this.templatePath} to ${this.destinationPath}...`)
    );

    fs.copySync(this.templatePath, this.destinationPath, {
      filter: (fullPath) => {
        const ignored = /(node_modules|scjssconfig.json|deploysecret)/.test(fullPath);

        if (!ignored) {
          console.log(chalk.gray(`copy ${fullPath}...`));
        }

        return !ignored;
      },
    });
  }
}
