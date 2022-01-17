import { ClientAppArgs, StyleguideArgs } from '../../common';
import { AngularAnswer } from './prompts';

export type AngularArgs = ClientAppArgs & StyleguideArgs & Partial<AngularAnswer>;
