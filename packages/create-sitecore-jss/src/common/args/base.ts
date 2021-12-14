import { ClientAppAnswer } from '../prompts/base';

type Arg = string | number | boolean;

export interface BaseArgs {
  [key: string]: Arg | Arg[] | undefined;
  templates: string[];
  destination: string;
  silent?: boolean;
  force?: boolean;
  yes?: boolean;
}

export interface ClientAppArgs extends BaseArgs, Partial<ClientAppAnswer> {
  appPrefix?: boolean;
}

export interface ReactNativeArgs extends BaseArgs, Partial<Omit<ClientAppAnswer, 'fetchWith'>> {}
