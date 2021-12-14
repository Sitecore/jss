import { BaseArgs } from '../../common/args/base';
import { ClientAppAnswer } from '../../common/prompts/base';

export interface ReactNativeArgs extends BaseArgs, Partial<Omit<ClientAppAnswer, 'fetchWith'>> {}
