import axios from 'axios';
import config from './temp/config';

/**
 * Check whether user access application using port or hostname
 * @returns {boolean}
 */
const hostnameIncludesIP = () => window.location.href.includes(config.ipAddress);

/**
 * Get hostname which used to access application
 * @returns {string} hostname
 */
export const getHostname = () => hostnameIncludesIP() ? config.ipAddress : config.sitecoreApiHost 

/**
 * Get GraphQLEndpoint that depends on current hostname
 * @returns {string} GraphQLEndpoint
 */
export const getGraphQLEndpoint = () =>
  hostnameIncludesIP() 
    ? config.graphQLEndpoint.replace(config.sitecoreApiHost, config.ipAddress)
    : config.graphQLEndpoint 

/**
 * Implements a data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpJsonFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export function dataFetcher(url, data) {
  return axios({
    url,
    method: data ? 'POST' : 'GET',
    data,
    // note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
    // which is necessary for analytics and such
    withCredentials: true,
  });
}
