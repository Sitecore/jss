import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export interface VueAnswer extends ClientAppAnswer, StyleguideAnswer {}

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
