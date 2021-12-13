import { QuestionCollection } from 'inquirer';

import { clientAppPrompts, ClientAppAnswer } from '../../common/prompts/base';

export enum Prerender {
  SSG = 'SSG',
  SSR = 'SSR',
}

export interface NextjsAnswer extends ClientAppAnswer {
  prerender: Prerender;
}

export const prompts: QuestionCollection<NextjsAnswer> = [
  ...clientAppPrompts,
  {
    type: 'list',
    name: 'prerender',
    message: 'How would you like to prerender your application?',
    choices: Object.values(Prerender),
    default: Prerender.SSG,
  },
];
