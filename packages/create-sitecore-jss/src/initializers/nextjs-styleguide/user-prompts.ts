import { NextjsStyleguideAnswer } from './NextjsStyleguideAnswer';
import { QuestionCollection } from 'inquirer';

export const userPrompts: QuestionCollection<NextjsStyleguideAnswer> = [
  {
    type: 'input',
    name: 'language',
    message:
      'Which additional language do you want to support (en is default)? Leave empty if not needed',
    default: '',
  },
];
