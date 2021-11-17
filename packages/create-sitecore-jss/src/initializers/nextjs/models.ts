import { Answers } from 'inquirer';
export interface Answer extends Answers {
  appName: string;
  destination: string;
  fetchWith: string;
  prerender: string;
  hostname: string;
}
