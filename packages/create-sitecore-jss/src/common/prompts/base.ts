import chalk from 'chalk';
import { Answers, DistinctQuestion } from 'inquirer';

export enum FetchWith {
  GraphQL = 'GraphQL',
  REST = 'REST',
}

/**
 * Set of CLI answers for the client-side app
 */
export type ClientAppAnswer = Answers & {
  /**
   * Application name
   */
  appName: string;
};

/**
 * Default app name for the new app
 */
export const DEFAULT_APPNAME = 'sitecore-jss-app';
export const DEFAULT_FETCHWITH = FetchWith.GraphQL;

/**
 * Set of CLI prompts for the client-side app
 */
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
];

export const missingAddonMsg = (source: string, missingAddon: string) =>
  chalk.yellow(
    `Warning: ${source} add-on cannot be used without the ${missingAddon} add-on. This may cause unexpected results.`
  );

export const incompatibleAddonsMsg = (source: string, incompatibleAddon: string) =>
  chalk.yellow(
    `Warning: ${source} add-on is not compatible with ${incompatibleAddon} add-on. This may cause unexpected results.`
  );
