import { StyleguideArgs, ClientAppArgs } from './../../common';
import { ReactAnswer } from './prompts';

export type ReactArgs = ClientAppArgs & StyleguideArgs & Partial<ReactAnswer>;
