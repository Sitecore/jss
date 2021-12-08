import { ClientAppArgs } from '../../common/args/base';
import { NextjsAnswer } from './prompts';

export interface NextjsArgs extends ClientAppArgs, Partial<NextjsAnswer> {}
