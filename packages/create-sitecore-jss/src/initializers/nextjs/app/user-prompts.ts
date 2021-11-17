import { QuestionCollection } from 'inquirer';
import { Answer } from '../models';
import chalk from 'chalk';

export const userPrompts: QuestionCollection<Answer> = [
  // App name
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: 'sitecore-jss-nextjs',
    validate: (input: string): boolean => {
      if (!/^[a-z\-_.]+$/.test(input)) {
        console.error(
          chalk.red(
            `${input} is not a valid name; you may use lowercase letters, hyphens, and underscores only.`
          )
        );
        return false;
      }
      return true;
    },
  },
  // destination path
  {
    type: 'input',
    name: 'destination',
    message: 'Where would you like your new app created?',
    default: (answers: Answer) => `${process.cwd()}\\${answers.appName}`,
  },
  // fetchWith
  {
    type: 'list',
    name: 'fetchWith',
    message: 'How would you like to fetch Layout and Dictionary data?',
    choices: ['GraphQL', 'REST'],
    default: 'GraphQL',
  },
  // prerender
  {
    type: 'list',
    name: 'prerender',
    message: 'How would you like to prerender your application?',
    choices: ['SSG', 'SSR'],
    default: 'SSG',
  },
  // hostName
  {
    type: 'input',
    name: 'hostName',
    message: 'What is your Sitecore hostname?',
    default: 'https://cm.jss.localhost',
  },
];
