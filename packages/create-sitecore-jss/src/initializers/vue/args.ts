import { ClientAppArgs } from './../../common/args/base';
import { VueAnswer } from './prompts';
import { StyleguideArgs } from '../../common/args/styleguide';

export interface VueArgs extends ClientAppArgs, StyleguideArgs, Partial<VueAnswer> {}
