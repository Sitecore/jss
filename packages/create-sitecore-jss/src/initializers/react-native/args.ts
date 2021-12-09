import { ClientAppArgs } from '../../common/args/base';
import { ReactNativeAnswer } from './prompts';

export interface ReactNativeArgs extends ClientAppArgs, Partial<ReactNativeAnswer> {}
