import { Generator, GenerateArgs } from '../../models';
import { Arguments } from 'yargs';
// import { prompt } from 'inquirer';
// import fs from 'fs';
// import chalk from 'chalk';

export class NextjsGenerator implements Generator {
  // promptUser() {
  //     // inquirer stuff here
  //     // prompt()
  // }  
  generate(args: Arguments<GenerateArgs>) {
    console.log('args: ', args)
    // do the stuff
    // this.promptUser();
  }
}
