import { StyleguideAnswer } from '../prompts/styleguide';
import { ClientAppArgs } from './base';

export interface StyleguideArgs extends ClientAppArgs, Partial<StyleguideAnswer> {}
