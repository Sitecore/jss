import { Generator, GenerateArgs, Answer } from '../models';
import { userPrompts } from './user-prompts';
import { prompt } from 'inquirer';
import { copyFiles, getDestinationPath } from '../../../shared';
import path from 'path';
// import fs from 'fs';
// import chalk from 'chalk';

export class NextjsGenerator implements Generator {
  async promptUser(): Promise<Answer> {
    // inquirer stuff here
    return await prompt<Answer>(userPrompts);
  }
  // async writing(answers: Answer) {
  //   // call ejs render
  //   // pass in answers
  //   // renderFile()
  // }
  async generate(args: GenerateArgs) {
    console.log('args: ', args);
    // do the stuff
    const answers: Answer = await this.promptUser();
    console.log('answers: ', answers);
    // path to the templates
    const templatePath = path.resolve(__dirname, 'templates');

    // returns array of filenames to render with ejs
    copyFiles(templatePath, getDestinationPath(answers.destination));
    // this.writing(answers);
  }
}
