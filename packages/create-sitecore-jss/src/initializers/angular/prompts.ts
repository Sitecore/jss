import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export type AngularAnswer = ClientAppAnswer &
  StyleguideAnswer & {
    xmcloud: boolean;
  };

export const prompts = [
  // XMCloud answer defines init behavior. Prompt must go first
  {
    type: 'confirm',
    name: 'xmcloud',
    message: 'Are you building for Sitecore XM Cloud?',
    default: false,
    when: (answers: AngularAnswer): boolean => {
      // don't prompt if --yes or angular-xmcloud template was specified
      if (answers.yes) {
        return false;
      } else if (
        answers.templates.includes('angular-xmcloud') &&
        !answers.templates.includes('angular-sxp')
      ) {
        answers.xmcloud = true;
        return false;
      }
      return true;
    },
  },
  ...clientAppPrompts,
  ...styleguidePrompts,
];
