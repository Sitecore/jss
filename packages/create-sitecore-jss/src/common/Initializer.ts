import { ParsedArgs } from 'minimist';

export interface InitializerResults {
  nextSteps: string[];
  appName: string;
  yes?: boolean;
}
export interface Initializer {
  init: (args: ParsedArgs) => Promise<InitializerResults>;
}
