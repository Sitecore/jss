import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Answer } from '../models';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { userPrompts } from './user-prompts';
import { Initializer } from '../../../initializers';
import { transformFiles } from '../../../shared';

export class NextjsInitializer implements Initializer {
  async init(args: ParsedArgs) {
      let answers: Answer;
      if (args.yes) {
        answers = {
          appName: 'sitecore-jss-nextjs',
          destination: `${process.cwd()}\\sitecore-jss-nextjs`,
          fetchWith: 'GraphQL',
          prerender: 'SSG',
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
        };
      } else {
        answers = await prompt<Answer>(userPrompts, args);
      }

      const destination = path.resolve(answers.destination);
      if (fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
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

      // TODO: npm/yarn install, [check --install flag?]
  }
}
