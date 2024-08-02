import { Answers, DistinctQuestion } from 'inquirer';

/**
 * Set of CLI answers for the client-side app
 */
export type SxpAnswer = Answers & {
  /**
   * Application host name
   */
  hostName: string;
};

/**
 * Set of CLI prompts for the client-side app
 */
export const sxpPrompts: DistinctQuestion<SxpAnswer>[] = [
  {
    type: 'input',
    name: 'hostName',
    message: 'What is your Sitecore hostname (used if deployed to Sitecore)?',
    default: (answers: SxpAnswer) => `${answers.appName}.dev.local`,
    when: (answers: SxpAnswer): boolean => {
      if (answers.yes && !answers.hostName) {
        answers.hostName = `${answers.appName}.dev.local`;
      }
      return !answers.hostName;
    },
  },
];
