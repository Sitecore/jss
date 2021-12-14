import { BaseArgs } from './../../common/args/base';
import { ClientAppAnswer } from './../../common/prompts/base';

export interface VueArgs extends BaseArgs, Partial<Omit<ClientAppAnswer, 'fetchWith'>> {}
