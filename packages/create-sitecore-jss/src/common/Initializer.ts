import { ParsedArgs } from 'minimist';

export interface InitializerResults {
  nextSteps: string[];
  appName: string;
}
export interface Initializer {
  init: (args: ParsedArgs) => Promise<InitializerResults>;
}
