/**
 * Parses raw env variable value into a Record
 * @param {string} mvEnv input
 * @returns non-empty Record
 * @throws error when input JSON can't be parsed
 */
export const parseMultiValueAsRecord = <T>(mvEnv: string): T => {
  try {
    return JSON.parse(mvEnv) as T;
  } catch (error) {
    console.log('Parsing of multivalue env variable failed');
    console.log(`Attempted to parse ${mvEnv}`);
    throw error;
  }
};

/**
 * Method to parse env variables
 * @param {string} envValue - can be undefined when providing values via process.env
 * @param {T} defaultValue - default value
 * @returns {T | string} parsed value, returns envValue if it's not an object
 */
export const tryParseEnvValue = <T>(envValue: string | undefined, defaultValue: T): T | string => {
  if (!envValue) {
    return defaultValue;
  }

  if (envValue.startsWith('{') && envValue.endsWith('}')) {
    return parseMultiValueAsRecord<T>(envValue);
  } else return envValue;
};
