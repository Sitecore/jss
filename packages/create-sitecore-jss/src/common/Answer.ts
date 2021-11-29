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
