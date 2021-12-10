import { ClientAppArgs } from '../../common/args/base';
import { FetchWith } from '../../common/prompts/base';
import { StyleguideArgs } from '../../common/args/styleguide';

export interface ReactNativeArgs
  extends StyleguideArgs,
    ClientAppArgs,
    Omit<ClientAppArgs, FetchWith> {}
