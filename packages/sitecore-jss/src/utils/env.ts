/**
 * Method to parse JSON-formatted environment variables
 * @param {string} envValue - can be undefined when providing values via process.env
 * @param {T} defaultValue - default value
 * @returns {T | string} parsed value
 */
export const tryParseEnvValue = <T>(envValue: string | undefined, defaultValue: T): T => {
  if (!envValue) {
    return defaultValue;
  }

  if (envValue.startsWith('{') && envValue.endsWith('}')) {
    try {
      return JSON.parse(envValue) as T;
    } catch (error) {
      console.warn('Parsing of env variable failed');
      console.warn(`Attempted to parse ${envValue}`);
      return defaultValue;
    }
  }

  return defaultValue;
};
