import { Answers, DistinctQuestion } from 'inquirer';
import { getDefaultProxyDestination } from '../utils/helpers';
import path from 'path';

export const FALLBACK_PROXYNAME = 'sitecore-jss-proxy-app';

/**
 * Set of args needed for proxy prompt
 */
export type ProxyArgs = Pick<Answers, 'yes'> & {
  // input args
  /**
   * main JSS app destination
   */
  destination: string;
  /**
   * Proxy name to be used for proxy destination folder
   */
  proxyName: string;
} & {
  // expected prompt output
  /**
   * destination for proxy app installed alongside main app
   */
  proxyAppDestination?: string;
};

/**
 * Set of CLI prompts for an SXP app
 */
export const proxyPrompts: DistinctQuestion<ProxyArgs>[] = [
  {
    type: 'input',
    name: 'proxyAppDestination',
    message: 'Where would you like your proxy app created?',
    default: (answers: ProxyArgs) => {
      // default proxy destination should be under same root as main app
      return getDefaultProxyDestination(
        answers.destination,
        answers.proxyName || FALLBACK_PROXYNAME
      );
    },
    when: (answers: ProxyArgs): boolean => {
      if (answers.yes && !answers.proxyAppDestination) {
        answers.proxyAppDestination = getDefaultProxyDestination(
          answers.destination,
          answers.proxyName || FALLBACK_PROXYNAME
        );
      }
      return !answers.proxyAppDestination;
    },
    validate: (input: string, answers: ProxyArgs) => {
      if (path.resolve(input) === path.resolve(answers.destination)) {
        return 'Paths for main app and proxy cannot match. Please choose another destination';
      }
      return true;
    },
  },
];
