import { ClientAppArgs } from '../../common';
import { NextjsAnswer } from './prompts';

export type NextjsArgs = ClientAppArgs & Partial<NextjsAnswer>;
