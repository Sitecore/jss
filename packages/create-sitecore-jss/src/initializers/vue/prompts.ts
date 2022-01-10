import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export type VueAnswer = ClientAppAnswer & StyleguideAnswer;

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
