import { Answer } from '../models';
import { userPrompts } from './user-prompts';
import { Initializer } from '../../../initializers';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { transformFiles } from '../../../shared';
import path from 'path';
// import fs from 'fs';
// import chalk from 'chalk';

export class NextjsInitializer implements Initializer {
  // async writing(answers: Answer) {
  //   // call ejs render
  //   // pass in answers
  //   // renderFile()
  // }
  async init(args: ParsedArgs) {
    // do the stuff
    const answers = await prompt<Answer>(userPrompts, args);
    // path to the templates
    const templatePath = path.resolve(__dirname, '../../../templates/nextjs/app');

    // returns array of filenames to render with ejs
    transformFiles(templatePath, answers);
  }
}
