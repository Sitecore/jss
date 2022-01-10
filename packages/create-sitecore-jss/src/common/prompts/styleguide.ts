import { Answers, DistinctQuestion } from 'inquirer';
import chalk from 'chalk';

/**
 * The subset of CLI answers for the styleguide app
 */
export interface StyleguideAnswer extends Answers {
  /**
   * Second language to be supported by the app
   */
  language?: string;
}

const LANGUAGE_REGEXP = /^(([a-z]{2}-[A-Z]{2})|([a-z]{2}))$/;
const DEFAULT_LANGUAGE = 'da-DK';

/**
 * The subset of CLI prompts for the styleguide app
 */
export const styleguidePrompts: DistinctQuestion<StyleguideAnswer>[] = [
  {
    type: 'input',
    name: 'language',
    message:
      'Which additional language do you want to support (en is already included and required)?',
    default: DEFAULT_LANGUAGE,
    validate: (input: string): boolean => {
      if (!LANGUAGE_REGEXP.test(input)) {
        console.error(
          chalk.red(
            `\n${input} is not a valid code; you may use language identifier, for example 'en',\nor you can add country code, for example 'US'. The language code is then 'en-US'.`
          )
        );
        return false;
      } else if (input === 'en') {
        console.error(
          chalk.red(
            `\nen is included by default. \nYou ${chalk.italic(
              'may'
            )} however add an en-* locale, for example 'en-UK'.`
          )
        );
        return false;
      }

      return true;
    },
    when: (answers: StyleguideAnswer): boolean => {
      if (answers.yes && !answers.language) {
        answers.language = DEFAULT_LANGUAGE;
      }
      return !answers.language;
    },
  },
];
