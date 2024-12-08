import { Answers, DistinctQuestion } from 'inquirer';
import { DEFAULT_APPNAME, DEFAULT_FETCHWITH, FetchWith } from './base';

/**
 * Set of CLI answers for an SXP app
 */
export type SxpAnswer = Answers & {
  /**
   * Application host name
   */
  hostName: string;
  /**
   * Determines which request method should be used.
   * Default is @type {DEFAULT_FETCHWITH}
   */
  fetchWith: FetchWith;
};

/**
 * Set of CLI prompts for an SXP app
 */
export const sxpPrompts: DistinctQuestion<SxpAnswer>[] = [
  {
    type: 'input',
    name: 'hostName',
    message: 'What is your Sitecore hostname (used if deployed to Sitecore)?',
    default: (answers: SxpAnswer) => `${answers.appName || DEFAULT_APPNAME}.dev.local`,
    when: (answers: SxpAnswer): boolean => {
      if (answers.yes && !answers.hostName) {
        answers.hostName = `${answers.appName || DEFAULT_APPNAME}.dev.local`;
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
    when: (answers: SxpAnswer): boolean => {
      if (answers.yes && !answers.fetchWith) {
        answers.fetchWith = DEFAULT_FETCHWITH;
      }
      return !answers.fetchWith;
    },
  },
];
