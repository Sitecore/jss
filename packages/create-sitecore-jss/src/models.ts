import { ParsedArgs } from 'minimist';
import { Answers } from 'inquirer';

export interface Answer extends Answers {
  force?: boolean;
  silent?: boolean;
  appName: string;
  destination: string;
  fetchWith: string;
  hostName: string;
  prefix?: boolean;
}

export interface Initializer {
  init: (args: ParsedArgs) => void; // tbd
}

export interface PackageJsonProperty {
  [key: string]: string 
  | { [key: string]: string } 
  | { [key: string]: string[] }
}
// export interface PackageJson {
//   [key: string]: PackageJsonProperty;
// }
