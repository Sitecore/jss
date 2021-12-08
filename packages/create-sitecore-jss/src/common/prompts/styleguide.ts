import { Answers, DistinctQuestion } from 'inquirer';
import chalk from 'chalk';

export interface StyleguideAnswer extends Answers {
  language?: string;
}

const LANGUAGE_REGEXP = /^(([a-z]{2}-[A-Z]{2})|([a-z]{2}))$/;

export const styleguidePrompts: DistinctQuestion<StyleguideAnswer>[] = [
  {
    type: 'input',
    name: 'language',
    message:
      'Which additional language do you want to support (en is default and required)? Leave empty if not needed',
    validate: (input: string): boolean => {
      if (!input) return true;

      if (!LANGUAGE_REGEXP.test(input)) {
        console.error(
          chalk.red(
            `${input} is not a valid code; you may use language identifier, for example 'en',\nor you can add country code, for example 'US'. The language code is then 'en-US'.`
          )
        );
        return false;
      }

      return true;
    },
  },
];
