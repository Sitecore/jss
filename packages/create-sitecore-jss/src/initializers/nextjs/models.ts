import { Answer } from '../../models';
export interface NextjsAnswer extends Answer {
  prerender: string;
  hostName: string;
  appPrefix?: boolean;
}
