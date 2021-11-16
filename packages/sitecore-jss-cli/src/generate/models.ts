import { Arguments } from 'yargs';

export interface GenerateArgs {
  name: string;
  template: string;
  path: string;
}

export interface Generator {
  // prompt: () => void; //tbd
  generate: (args: Arguments<GenerateArgs>) => void; // tbd
}