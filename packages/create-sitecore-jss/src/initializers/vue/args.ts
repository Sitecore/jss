import { ClientAppArgs, StyleguideArgs } from './../../common';
import { VueAnswer } from './prompts';

export type VueArgs = ClientAppArgs & StyleguideArgs & Partial<VueAnswer>;
