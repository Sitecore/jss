/* eslint-disable prettier/prettier */
import chalk from 'chalk';
import { Argv } from '../../node_modules/@types/yargs';
import microManifest from '../micro-manifest';

/**
 * @param {Argv} yargs
 */
export default function builder(yargs: Argv) {
  return yargs.command(
    'template <name>',
    // tslint:disable-next-line:max-line-length
    'Deploys a new template (or updates an existing template) to the Sitecore server when using Sitecore-first development. `jss deploy template --help` for options.',
    args,
    handler
  );
}

/**
 * @param {Argv} yargs
 */
export function args(yargs: Argv) {
  return yargs
    .positional('name', {
      type: 'string',
      describe: 'The name of the item to create or update.',
    })
    .option('displayName', {
      requiresArg: false,
      type: 'string',
      describe: 'Sets the display name of the item (visual name vs actual name)',
    })
    .option('fields', {
      requiresArg: false,
      type: 'array',
      describe:
        // tslint:disable-next-line:max-line-length
        'Creates template fields. Fields can be either a plain name, or name:fieldType. For example, --fields Foo Bar or --fields Foo "Bar Bas:Rich Text"',
    })
    .option('icon', {
      requiresArg: false,
      type: 'string',
      describe: 'Sets the icon of the item in Sitecore. For example, People/16x16/alarmclock.png',
    })
    .option('appName', {
      requiresArg: false,
      type: 'string',
      describe: 'The name of the app. Defaults to the package.json config value.',
    })
    .option('config', {
      requiresArg: false,
      type: 'string',
      describe: 'Path to scjssconfig file.',
      default: './scjssconfig.json',
    })
    .option('deployUrl', {
      requiresArg: false,
      type: 'string',
      describe:
        'URL to the Sitecore JSS import service that accepts the package deployment. Defaults to the \'deployUrl\' in scjssconfig.json.',
    })
    .option('skipDeploy', {
      requiresArg: false,
      type: 'boolean',
      describe:
        'If true, no deployment is made and the manifest registration code for code-first is written to the console instead.',
      default: false,
    })
    .option('acceptCertificate', {
      requiresArg: false,
      type: 'string',
      describe:
        'Whitelists a specific SSL certificate thumbprint, regardless of normal SSL validation. Useful for self-signed certificates.',
    });
}

/**
 * @param {Argv} argv
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
    fields,
  };

  const manifestSource = `module.exports = {
  default: function(manifest) {
    manifest.addTemplate(${JSON.stringify(definition, null, 2)});
  }
}`;

  if (argv.skipDeploy) {
    console.log(manifestSource);
  } else {
    await microManifest(argv, manifestSource);

    console.log();
    console.log(chalk.green('Your template has been created (or updated)!'));
    console.log();
  }
}
