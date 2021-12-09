import { DistinctQuestion, QuestionCollection } from 'inquirer';
import { styleguidePrompts, StyleguideAnswer } from '../../common/prompts/styleguide';
import { clientAppPrompts, ClientAppAnswer } from '../../common/prompts/base';

export interface ReactNativeAnswer extends StyleguideAnswer, Partial<ClientAppAnswer> {
  appName: string;
  hostName: string;
}

export const prompts: QuestionCollection<ReactNativeAnswer> = [
  // filter out the fetchWith question
  ...clientAppPrompts.filter((p: DistinctQuestion) => p.name !== 'fetchWith'),
  ...styleguidePrompts,
];
