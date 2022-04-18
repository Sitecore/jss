import { QuestionCollection } from 'inquirer';
import CheckboxPrompt from 'inquirer/lib/prompts/checkbox';

import { clientAppPrompts, ClientAppAnswer } from '../../common';

export enum Prerender {
  SSG = 'SSG',
  SSR = 'SSR',
}

export type NextjsAnswer = ClientAppAnswer & {
  prerender: Prerender;
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

    const isPersonalizeSelected = isSelected('nextjs-personalize');
    const isTrackingSelected = isSelected('nextjs-styleguide-tracking');

    if (isPersonalizeSelected && isTrackingSelected) {
      this.onError({
        isValid:
          'nextjs-styleguide-tracking add-on is not compatible with nextjs-personalize add-on',
      });
    }
  }
}
