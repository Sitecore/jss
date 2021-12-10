import { StyleguideArgs } from '../../common/args/styleguide';
import { VueAnswer } from './prompts';

export interface VueArgs extends StyleguideArgs, Partial<VueAnswer> {}
