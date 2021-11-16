
import { Question, Answers } from 'inquirer';
import chalk from 'chalk';

export interface Answer {
  appName: string;
  destination: string;
  fetchWith: string;
  prerender: string;
}

export const userPrompts: Question<Answer>[] = [
  // App name
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: 'JssNextWeb',
    validate: (input: string): boolean | undefined => {
        console.log(input);


        if (!/^[a-z\-_.]+$/.test(input)) {
            console.error(
              chalk.red(
                `${input} is not a valid name; you may use lowercase letters, hyphens, and underscores only.`
              )
              ) 
              return false;
              // process.exit(1);
          } 
        return true;
    }
  },
  // destination path
  {
    type: 'input',
    name: 'destination',
    message: 'Where would you like your new app created? (will be created at path/appName)',
    default: './',
  },
  // fetchWith
  {
  type: 'list',
  name: 'fetchWith',
  message: 'How would you like to fetch Layout and Dictionary data?',
  choices: ['GraphQL', 'REST'],
  },
  // Prerender
  {
  type: 'list',
  name: 'prerender',
  message: 'How would you like to prerender your application?',
  choices: ['SSR', 'SSG'],
  },
  
];