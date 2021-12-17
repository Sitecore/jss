const getDeprecationMessage = (argv: { [key: string]: unknown } = {}) =>
  [
    'jss create is not supported from JSS CLI 20.0.0',
    // TODO: add (link to docs: https://doc.sitecore.net/<officialLink> ) when article will be created
    'Please use npm init',
    `Use: npm init sitecore-jss ${argv?.template || 'nextjs'}`,
    'Please downgrade to JSS CLI 19.0.0 if you want to install older releases',
    'Use:',
    'npm install -g @sitecore-jss/sitecore-jss-cli@19.0.0',
    `jss create ${argv?.name || 'nextjs-app'} ${argv?.template ||
      'nextjs'} --branch release/19.0.0`,
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
