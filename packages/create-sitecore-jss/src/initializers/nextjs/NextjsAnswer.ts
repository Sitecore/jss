import { Answer } from '../../common/Answer';

export interface NextjsAnswer extends Answer {
  prerender: string;
  fetchWith: string;
}
