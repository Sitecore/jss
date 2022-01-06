import {
  ClientAppAnswer,
  clientAppPrompts,
  StyleguideAnswer,
  styleguidePrompts,
} from '../../common';

export interface AngularAnswer extends ClientAppAnswer, StyleguideAnswer {}

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
