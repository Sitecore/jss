const config = require('./temp/config');

/**
 * Check is disconnected mode started
 * @returns {boolean}
 */
const isDisconnected = () => /localhost/i.test(config.sitecoreApiHost);

module.exports.isDisconnected = isDisconnected;

/**
 * Get hostname which used to access application, in disconnected mode it can be localhost or ip address
 * @returns {string} hostname
 */
module.exports.getHostname = () =>
  isDisconnected() ? window.location.origin : config.sitecoreApiHost;
