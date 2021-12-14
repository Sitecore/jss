import { ClientAppArgs } from '../../common/args/base';
import { StyleguideArgs } from '../../common/args/styleguide';
import { AngularAnswer } from './prompts';

export interface AngularArgs extends ClientAppArgs, StyleguideArgs, Partial<AngularAnswer> {}
