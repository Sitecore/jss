import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export type AngularAnswer = ClientAppAnswer & StyleguideAnswer;

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
