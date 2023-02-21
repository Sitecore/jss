/**
 * Parses raw env variable value into a Record
 * @param {string} mvEnv input
 * @returns non-empty Record
 * @throws error when input JSON can't be parsed
 */
export const parseMultiValueAsRecord = (mvEnv: string): Record<string, string> => {
  try {
    return JSON.parse(mvEnv) as Record<string, string>;
  } catch (error) {
    console.log('Parsing of multivalue env variable failed');
    console.log(`Attempted to parse ${mvEnv}`);
    throw error;
  }
};

/**
 * Entry method to parse multi or single value env variables
 * @param {string} envValue - can be undefined when providing values via process.env
 * @returns Record or string depending on input format
 */
export const parseEnvValue = (envValue?: string): Record<string, string> | string => {
  if (!envValue) {
    return '';
  }

  if (envValue.startsWith('{') && envValue.endsWith('}')) {
    return parseMultiValueAsRecord(envValue);
  } else return envValue;
};
