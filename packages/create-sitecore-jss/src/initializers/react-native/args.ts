import { BaseArgs, ClientAppAnswer } from '../../common';

export interface ReactNativeArgs extends BaseArgs, Partial<Omit<ClientAppAnswer, 'fetchWith'>> {}
