import { ClientAppAnswer } from '../prompts/base';

type Arg = string | number | boolean;

export interface BaseArgs {
  [key: string]: Arg | Arg[] | undefined;
  destination: string;
  silent?: boolean;
  force?: boolean;
  yes?: boolean;
}

export interface ClientAppArgs extends BaseArgs, Partial<ClientAppAnswer> {
  appPrefix?: boolean;
}

export type NodeAppArgs = BaseArgs;
