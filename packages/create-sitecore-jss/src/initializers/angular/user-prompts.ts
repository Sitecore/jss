import chalk from 'chalk';
import { QuestionCollection } from 'inquirer';
import { AngularAnswer } from './AngularAnswer';

// should we merge the generic prompts into one file
// if so, where does it go?
// how will we extend it/merge multiple sets of prompts together?

export const userPrompts: QuestionCollection<AngularAnswer> = [
  // App name
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: 'sitecore-jss-angular',
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
  // hostName
  {
    type: 'input',
    name: 'hostName',
    message: 'What is your Sitecore hostname?',
    default: 'https://cm.jss.localhost',
  },
  {
    type: 'input',
    name: 'language',
    message: 'Which additional language do you want to support?',
    default: 'en-US',
  },
];
