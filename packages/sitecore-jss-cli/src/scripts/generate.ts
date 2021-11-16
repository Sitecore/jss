/* eslint-disable prettier/prettier */
import chalk from 'chalk';
// import fs from 'fs';
// import path from 'path';
import { Argv, Arguments } from 'yargs';
import { NextjsGenerator } from '../generate/index';
import { GenerateArgs } from '../generate/models';


/**
 * @param {any} yargs
 */
export function builder(yargs: Argv<GenerateArgs>) {
  return yargs.command(
    'generate <name> <template>',
    'Generates a new JSS application based on one of the starter templates',
    (innerBuilder) =>
      innerBuilder
        // .positional('name', {
        //   type: 'string',
        //   describe: 'The name of the app to create. ',
        // })
        .positional('template', {
          type: 'string',
          describe:
            'TODO',
        }),
        // .positional('path', {
        //   type: 'string',
        //   describe:
        //     'Path which app is created, default is ./{your-appname}',
        // }),
    handler
  );
}

/**
 * @param {any} argv
 */
async function handler(argv: Arguments<GenerateArgs>) {
    // if (!argv.path) {
    //     argv.path = path.join(process.cwd(), argv.name);
    // }
    // checkName(argv.name, argv.path);

    let generator;
    // find template
    // use that generator
    switch (argv.template) {
        case 'nextjs':
            // import from generate/nextjs/app
            generator = new NextjsGenerator();
            return generator.generate(argv);
        default:
            console.error(
                chalk.red(`Template ${argv.template} unsupported`));
                process.exit(1);
    }

}

/**
 * @param {string} name
 * @param {string} proposedPath
 */
// function checkName(name: string, proposedPath: string) {
//   if (!/^[a-z\-_.]+$/.test(name)) {
//     console.error(
//       chalk.red(
//         `${name} is not a valid name; you may use lowercase letters, hyphens, and underscores only.`
//       )
//       );
//       process.exit(1);
//   }

//   if (fs.existsSync(proposedPath)) {
//     console.error(
//       chalk.red(`${proposedPath} already exists; please delete it first if you wish to overwrite.`)
//     );
//     process.exit(1);
//   }
// }
