import { StyleguideArgs } from '../../common/args/styleguide';
import { AngularAnswer } from './prompts';

export interface AngularArgs extends StyleguideArgs, Partial<AngularAnswer> {}
