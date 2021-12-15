import { ClientAppArgs } from './../../common/args/base';
import { VueAnswer } from './prompts';

export interface VueArgs extends ClientAppArgs, Partial<VueAnswer> {}
