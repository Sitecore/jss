import { DistinctQuestion, QuestionCollection } from 'inquirer';
import { styleguidePrompts, StyleguideAnswer } from '../../common/prompts/styleguide';
import { clientAppPrompts, ClientAppAnswer } from '../../common/prompts/base';

export interface ReactNativeAnswer extends Omit<ClientAppAnswer, 'fetchWith'>, StyleguideAnswer {}

export const prompts: QuestionCollection<ReactNativeAnswer> = [
  ...clientAppPrompts.filter((p: DistinctQuestion) => p.name !== 'fetchWith'),
  ...styleguidePrompts,
];
