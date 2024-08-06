import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
  sxpPrompts,
} from '../../common';

export type VueAnswer = ClientAppAnswer & StyleguideAnswer;

export const prompts = [...clientAppPrompts, ...sxpPrompts, ...styleguidePrompts];
