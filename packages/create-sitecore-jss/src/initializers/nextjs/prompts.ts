import { QuestionCollection } from 'inquirer';
import CheckboxPrompt from 'inquirer/lib/prompts/checkbox';

import { clientAppPrompts, ClientAppAnswer, incompatibleAddonsMsg } from '../../common';

export enum Prerender {
  SSG = 'SSG',
  SSR = 'SSR',
}

export type NextjsAnswer = ClientAppAnswer & {
  prerender: Prerender;
  xmcloud: boolean;
};

const DEFAULT_PRERENDER = Prerender.SSG;

export const prompts: QuestionCollection<NextjsAnswer> = [
  ...clientAppPrompts,
  {
    type: 'list',
    name: 'prerender',
    message: 'How would you like to prerender your application?',
    choices: Object.values(Prerender),
    default: DEFAULT_PRERENDER,
    when: (answers: NextjsAnswer): boolean => {
      if (answers.yes && !answers.prerender) {
        answers.prerender = DEFAULT_PRERENDER;
      }
      return !answers.prerender;
    },
  },
  {
    type: 'confirm',
    name: 'xmcloud',
    message: 'Are you building for Sitecore XM Cloud?',
    default: false,
    when: (answers: NextjsAnswer): boolean => {
      return !answers.yes;
    },
  },
];

/**
 * Custom `inquirer` control to support error messages
 */
export class NextjsCheckbox extends CheckboxPrompt {
  onSpaceKey() {
    super.onSpaceKey();

    const isSelected = (initializer: string) =>
      this.opt.choices.choices.find((ch) => {
        const { value, checked } = ch as { [key: string]: unknown };

        return value === initializer && checked;
      });

    const isSxaSelected = isSelected('nextjs-sxa');
    const isStyleguideSelected = isSelected('nextjs-styleguide');

    if (isSxaSelected && isStyleguideSelected) {
      this.onError({
        isValid: incompatibleAddonsMsg('nextjs-sxa', 'nextjs-styleguide'),
      });
    }
  }
}
