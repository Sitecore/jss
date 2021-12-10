import chalk from 'chalk';
import { DistinctQuestion } from 'inquirer';

export enum FetchWith {
  GraphQL = 'GraphQL',
  REST = 'REST',
}

export interface ClientAppAnswer {
  appName: string;
  fetchWith: FetchWith;
  hostName: string;
}

export const clientAppPrompts: DistinctQuestion[] = [
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: 'sitecore-jss-app',
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
  {
    type: 'list',
    name: 'fetchWith',
    message: 'How would you like to fetch Layout and Dictionary data?',
    choices: Object.values(FetchWith),
    default: FetchWith.GraphQL,
  },
  {
    type: 'input',
    name: 'hostName',
    message: 'What is your Sitecore hostname?',
    default: 'https://cm.jss.localhost',
  },
];
