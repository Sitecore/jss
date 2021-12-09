const config = require('./temp/config');
const { constants } = require('@sitecore-jss/sitecore-jss-react');

/**
 * Check is disconnected mode started
 * @returns {boolean}
 */
const isDisconnected = () => process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

module.exports.isDisconnected = isDisconnected;

/**
 * Get hostname which used to access application, in disconnected mode it can be localhost or ip address
 * @returns {string} hostname
 */
module.exports.getHostname = () =>
  isDisconnected() ? window.location.origin : config.sitecoreApiHost;
