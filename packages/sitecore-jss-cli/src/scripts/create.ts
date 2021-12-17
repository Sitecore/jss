/* eslint-disable prettier/prettier */
import { Argv } from 'yargs';

/**
 * @param {any} yargs
 */
export function builder(yargs: Argv) {
  return yargs.command(
    'create <name> <template>',
    getDeprecationMessage(),
    (innerBuilder) => innerBuilder,
    handler
  );
}

const getDeprecationMessage = (argv: { [key: string]: unknown } = {} ) => [
  'jss create is not supported from JSS CLI 20.0.0',
  // TODO: add (link to docs: https://doc.sitecore.net/<officialLink> ) when article will be created
  'Please use npm init',
  `Use: npm init sitecore-jss ${argv?.template || 'nextjs'}`,
  'Please downgrade to JSS CLI 19.0.0 if you want to install older releases',
  'Use:',
  'npm install -g @sitecore-jss/sitecore-jss-cli@19.0.0',
  `jss create ${argv?.name || 'nextjs-app'} ${argv?.template || 'nextjs'} --branch release/19.0.0`
].join('\n');

/**
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handler(argv: any) {
  console.log(getDeprecationMessage(argv));
}
