import { DistinctQuestion, QuestionCollection } from 'inquirer';
import { styleguidePrompts, StyleguideAnswer } from '../../common/prompts/styleguide';
import { clientAppPrompts, ClientAppAnswer, FetchWith } from '../../common/prompts/base';

export interface ReactNativeAnswer
  extends StyleguideAnswer,
    ClientAppAnswer,
    Omit<ClientAppAnswer, FetchWith> {}

export const prompts: QuestionCollection<ReactNativeAnswer> = [
  ...clientAppPrompts.filter((p: DistinctQuestion) => p.name !== 'fetchWith'),
  ...styleguidePrompts,
];
