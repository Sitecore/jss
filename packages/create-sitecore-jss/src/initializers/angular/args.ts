import { ClientAppArgs } from '../../common';
import { StyleguideArgs } from '../../common';
import { AngularAnswer } from './prompts';

export interface AngularArgs extends ClientAppArgs, StyleguideArgs, Partial<AngularAnswer> {}
