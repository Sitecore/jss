import { BaseArgs, ClientAppAnswer } from '../../common';

export type ReactNativeArgs = BaseArgs & Partial<Omit<ClientAppAnswer, 'fetchWith'>>;
