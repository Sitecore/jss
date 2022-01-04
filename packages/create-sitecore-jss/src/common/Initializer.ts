import { BaseArgs } from './args/base';

export interface InitializerResults {
  appName: string;
  initializers?: string[];
  nextSteps?: string[];
}
export interface Initializer {
  isBase: boolean;
  init: (args: BaseArgs) => Promise<InitializerResults>;
}
