import { ClientAppArgs } from '../../common';
import { NextjsAnswer } from './prompts';

export interface NextjsArgs extends ClientAppArgs, Partial<NextjsAnswer> {}
