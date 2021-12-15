import { ClientAppArgs } from './../../common/args/base';
import { ReactAnswer } from './prompts';

export interface ReactArgs extends ClientAppArgs, Partial<ReactAnswer> {}
