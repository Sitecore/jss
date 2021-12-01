import { ParsedArgs } from 'minimist';

export interface InitializerResults {
  nextSteps: string[];
}
export interface Initializer {
  init: (args: ParsedArgs) => Promise<InitializerResults>;
}
