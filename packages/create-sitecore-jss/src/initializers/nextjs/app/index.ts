import { Answer } from '../models';
import { userPrompts } from './user-prompts';
import { Initializer } from '../../../initializers';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { transformFiles } from '../../../shared';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export class NextjsInitializer implements Initializer {
  async init(args: ParsedArgs) {
    const answers = await prompt<Answer>(userPrompts, args);
    
    if (fs.readdirSync(path.resolve(answers.destination)).length > 0) {
      const answer = await prompt({
        type: 'confirm',
        name: 'continue',
        message: `Directory '${answers.destination}' not empty. Are you sure you want to continue?`,
      });
      if (!answer.continue) {
        process.exit();
      }
    }

    const templatePath = path.resolve(__dirname, '../../../templates/nextjs/app');
    transformFiles(templatePath, answers);
    console.log(chalk.green('Success!'));
  }
}
