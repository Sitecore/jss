import { ClientAppAnswer, clientAppPrompts } from '../../common/prompts/base';
import { StyleguideAnswer, styleguidePrompts } from '../../common/prompts/styleguide';

export interface VueAnswer extends ClientAppAnswer, StyleguideAnswer {}

export const prompts = [...clientAppPrompts, ...styleguidePrompts];
