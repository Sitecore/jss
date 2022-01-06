import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export interface ReactAnswer extends ClientAppAnswer, StyleguideAnswer {}

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
