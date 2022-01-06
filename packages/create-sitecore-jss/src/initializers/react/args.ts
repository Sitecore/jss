import { StyleguideArgs, ClientAppArgs } from './../../common';
import { ReactAnswer } from './prompts';

export interface ReactArgs extends ClientAppArgs, StyleguideArgs, Partial<ReactAnswer> {}
