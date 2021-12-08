import { BaseArgs } from './args/base';

export interface InitializerResults {
  nextSteps: string[];
  appName: string;
  yes?: boolean;
}
export interface Initializer {
  init: (args: BaseArgs) => Promise<InitializerResults>;
}
