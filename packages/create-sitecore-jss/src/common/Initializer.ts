import { ParsedArgs } from 'minimist';

export interface InitializerResults {
  appName: string;
  initializers?: string[];
  nextSteps?: string[];
  yes?: boolean;
}
export interface Initializer {
  init: (args: ParsedArgs) => Promise<InitializerResults>;
}
