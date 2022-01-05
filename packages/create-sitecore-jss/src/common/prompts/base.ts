import chalk from 'chalk';
import { Answers, DistinctQuestion } from 'inquirer';

export enum FetchWith {
  GraphQL = 'GraphQL',
  REST = 'REST',
}

export interface ClientAppAnswer extends Answers {
  appName: string;
  fetchWith: FetchWith;
  hostName: string;
}

export const DEFAULT_APPNAME = 'sitecore-jss-app';
export const DEFAULT_FETCHWITH = FetchWith.GraphQL;

export const clientAppPrompts: DistinctQuestion<ClientAppAnswer>[] = [
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: DEFAULT_APPNAME,
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
    when: (answers: ClientAppAnswer): boolean => {
      if (answers.yes && !answers.appName) {
        answers.appName = DEFAULT_APPNAME;
      }
      return !answers.appName;
    },
  },
  {
    type: 'input',
    name: 'hostName',
    message: 'What is your Sitecore hostname (used if deployed to Sitecore)?',
    default: (answers: ClientAppAnswer) => `${answers.appName}.dev.local`,
    when: (answers: ClientAppAnswer): boolean => {
      if (answers.yes && !answers.hostName) {
        answers.hostName = `${answers.appName}.dev.local`;
      }
      return !answers.hostName;
    },
  },
  {
    type: 'list',
    name: 'fetchWith',
    message: 'How would you like to fetch Layout and Dictionary data?',
    choices: Object.values(FetchWith),
    default: DEFAULT_FETCHWITH,
    when: (answers: ClientAppAnswer): boolean => {
      if (answers.yes && !answers.fetchWith) {
        answers.fetchWith = DEFAULT_FETCHWITH;
      }
      return !answers.fetchWith;
    },
  },
];
