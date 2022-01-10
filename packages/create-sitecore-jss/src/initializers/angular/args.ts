import { ClientAppArgs, StyleguideArgs } from '../../common';
import { AngularAnswer } from './prompts';

export interface AngularArgs extends ClientAppArgs, StyleguideArgs, Partial<AngularAnswer> {}
