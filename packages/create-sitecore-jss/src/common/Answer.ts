import { Answers } from 'inquirer';

export interface Answer extends Answers {
  force?: boolean;
  silent?: boolean;
  appName: string;
  destination: string;
  appPrefix?: boolean;
  yes?: boolean;
}
