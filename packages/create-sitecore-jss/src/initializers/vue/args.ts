import { ClientAppArgs, StyleguideArgs } from './../../common';
import { VueAnswer } from './prompts';

export interface VueArgs extends ClientAppArgs, StyleguideArgs, Partial<VueAnswer> {}
