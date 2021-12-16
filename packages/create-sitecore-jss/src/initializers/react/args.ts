import { StyleguideArgs } from './../../common/args/styleguide';
import { ClientAppArgs } from './../../common/args/base';
import { ReactAnswer } from './prompts';

export interface ReactArgs extends ClientAppArgs, StyleguideArgs, Partial<ReactAnswer> {}
