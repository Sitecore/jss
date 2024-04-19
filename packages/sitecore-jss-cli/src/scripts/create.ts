import chalk from 'chalk';

const getDeprecationMessage = (argv: { [key: string]: unknown } = {}) =>
  [
    chalk.red('**DEPRECATED**'),
    'jss create is not supported from JSS CLI version 20.0.0.',
    'Please use npx create-sitecore-jss instead. For example:',
    chalk.green(`npx create-sitecore-jss ${argv?.template || 'nextjs'}`),
    // TODO: keep updating this link for new versions
    'Read more: https://doc.sitecore.com/xp/en/developers/hd/21/sitecore-headless-development/the-jss-app-initializer.html',
    'Please downgrade to a previous JSS CLI version if you want to install older releases. For example:',
    chalk.green('npm install -g @sitecore-jss/sitecore-jss-cli@19.0.0'),
    chalk.green(
      `jss create ${argv?.name || 'nextjs-app'} ${argv?.template ||
        'nextjs'} --branch release/19.0.0`
    ),
  ].join('\n');

export const command = 'create <name> <template>';

export const describe = getDeprecationMessage();

export const builder = {};

/**
 * Handle `jss create` command
 * @param {Object} argv cli arguments
 */
export function handler(argv: { [key: string]: unknown }) {
  console.log(getDeprecationMessage(argv));
}
