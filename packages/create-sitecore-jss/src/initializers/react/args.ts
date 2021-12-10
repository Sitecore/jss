import { StyleguideArgs } from '../../common/args/styleguide';
import { ReactAnswer } from './prompts';

export interface ReactArgs extends StyleguideArgs, Partial<ReactAnswer> {}
