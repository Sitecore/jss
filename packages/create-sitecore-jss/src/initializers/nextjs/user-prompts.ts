import chalk from 'chalk';
import { NextjsAnswer } from './NextjsAnswer';
import { QuestionCollection } from 'inquirer';

export const userPrompts: QuestionCollection<NextjsAnswer> = [
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
