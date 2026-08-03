import { QuestionCollection } from 'inquirer';
import CheckboxPrompt from 'inquirer/lib/prompts/checkbox';

import { clientAppPrompts, ClientAppAnswer, incompatibleAddonsMsg, sxpPrompts } from '../../common';

export enum Prerender {
  SSG = 'SSG',
  SSR = 'SSR',
}

export type NextjsAnswer = ClientAppAnswer & {
  prerender: Prerender;
};

const DEFAULT_PRERENDER = Prerender.SSG;

/*
 * Shared prerender configuration for the selected prerendering strategy (SSG or SSR).
 *
 * This object is initialized with a default prerender value (`SSG`) and is updated
 * dynamically after the primary Next.js initializer's initialization process based on
 * user input collected via prompts without having to re-prompt or duplicate logic.
 */
export const sharedPrerender = {
  prerender: DEFAULT_PRERENDER,
};

export const prompts: QuestionCollection<NextjsAnswer> = [
  ...clientAppPrompts,
  ...sxpPrompts,
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

    const isSxaSelected = isSelected('nextjs-sxa');
    const isStyleguideSelected = isSelected('nextjs-styleguide');

    if (isSxaSelected && isStyleguideSelected) {
      this.onError({
        isValid: incompatibleAddonsMsg('nextjs-sxa', 'nextjs-styleguide'),
      });
    }
  }
}
