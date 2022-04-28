import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export type ReactAnswer = ClientAppAnswer & StyleguideAnswer;

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
