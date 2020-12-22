import chalk from 'chalk';
import { Argv } from '../../node_modules/@types/yargs';
import microManifest from '../micro-manifest';
import { args as templateArgs } from './deploy.template';

/**
 * @param {Argv} yargs
 */
export default function builder(yargs: Argv) {
  return yargs.command(
    'component <name>',
    'Deploys a new component (or updates an existing component) to the Sitecore server when using Sitecore-first development. `jss deploy component --help` for options.',
    args,
    handler
  );
}

/**
 * @param {Argv} yargs
 */
export function args(yargs: Argv) {
  return templateArgs(yargs)
    .option('allowedPlaceholders', {
      requiresArg: false,
      type: 'array',
      describe:
        'The placeholder name(s) to allow the rendering to be placed in. For example --allowedPlaceholders Foo or --allowedPlaceholders Foo Bar',
    })
    .option('exposesPlaceholders', {
      requiresArg: false,
      type: 'array',
      describe:
        'The names of any placeholders that are exposed on this component (to place other components in). This will cause placeholder settings items to be generated for them.',
    });
}

/**
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handler(argv: any) {
  // create micro-manifest to deploy from
  const fields: Array<{ name: string; type: string }> = [];

  if (argv.fields && argv.fields.length > 0) {
    argv.fields.forEach((field: string) => {
      const splitField = field.split(':');
      const fieldType = splitField.length === 1 ? 'Single-Line Text' : splitField[1];

      fields.push({ name: splitField[0], type: fieldType });
    });
  }

  const definition = {
    name: argv.name,
    displayName: argv.displayName,
    icon: argv.icon,
    fields: fields.length === 0 ? null : fields,
    placeholders: argv.exposesPlaceholders,
    allowedPlaceholders: argv.allowedPlaceholders,
  };

  const manifestSource = `module.exports = {
  default: function(manifest) {
    manifest.addComponent(${JSON.stringify(definition, null, 2)});
  }
}`;

  if (argv.skipDeploy) {
    console.log(manifestSource);
  } else {
    await microManifest(argv, manifestSource);

    console.log(`
${chalk.green('Your component has been created (or updated)!')}

${chalk.green('NEXT STEPS FOR NEW COMPONENTS')}

* Create a component in your JSS application called ${chalk.green(argv.name)} (${chalk.green(
      `jss scaffold ${argv.name}`
    )})
* Deploy your app with the new component to Sitecore (${chalk.green(
      'jss deploy:watch'
    )} or ${chalk.green('jss deploy files')})
* Add the new component to a route item using the Experience Editor
`);
  }
}
