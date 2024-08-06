import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
  sxpPrompts,
} from '../../common';

export type ReactAnswer = ClientAppAnswer & StyleguideAnswer;

export const prompts = [...clientAppPrompts, ...sxpPrompts, ...styleguidePrompts];
