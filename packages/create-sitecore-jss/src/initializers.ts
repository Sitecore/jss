import { ParsedArgs } from 'minimist';

export interface Initializer {
  init: (args: ParsedArgs) => void; // tbd
}
