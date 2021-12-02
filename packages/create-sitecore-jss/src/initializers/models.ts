import { Answer } from '../common/Answer';
export interface NextjsAnswer extends Answer {
  prerender: string;
  hostName: string;
  appPrefix?: boolean;
}
