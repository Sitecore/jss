import { ClientAppAnswer, clientAppPrompts, StyleguideAnswer } from '../../common';

export type AngularAnswer = ClientAppAnswer & StyleguideAnswer;

export const prompts = [...clientAppPrompts];
