import { DistinctQuestion, QuestionCollection } from 'inquirer';
import {
  styleguidePrompts,
  StyleguideAnswer,
  clientAppPrompts,
  ClientAppAnswer,
} from '../../common';

export interface ReactNativeAnswer extends Omit<ClientAppAnswer, 'fetchWith'>, StyleguideAnswer {}

export const prompts: QuestionCollection<ReactNativeAnswer> = [
  ...clientAppPrompts.filter((p: DistinctQuestion<ClientAppAnswer>) => p.name !== 'fetchWith'),
  ...styleguidePrompts,
];
