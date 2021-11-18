import { ParsedArgs } from 'minimist';
import { Answers } from 'inquirer';

export interface Answer extends Answers {
  force?: boolean;
  silent?: boolean;
  appName: string;
  destination: string;
  fetchWith: string;
  hostname: string;
}

export interface Initializer {
  init: (args: ParsedArgs) => void; // tbd
}
