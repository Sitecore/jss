/**
 * Generates unique app name based on sample app configuration
 * @param {Record<string, string>} args sample app arguments
 * @returns unique app name
 */
module.exports.getAppName = (args) =>
  `sample-${args.appName}-${args.fetchWith || ''}-${args.prerender || ''}`;
