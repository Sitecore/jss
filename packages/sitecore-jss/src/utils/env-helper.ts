export class EnvHelper {
  /**
   * Entry method to parse multi or single value env variables
   * @param {string} envValue
   * @returns Record, Array or string depending on input format
   */
  static parseEnvValue = (envValue: string): Record<string, string> | string => {
    if (envValue.startsWith('{') && envValue.endsWith('}')) {
      return EnvHelper.parseMultiValueAsRecord(envValue);
    } else return envValue;
  };

  /**
   * Parses raw env variable value into a Record (locale-bound in some cases)
   * @param {string} mvEnv input
   * @returns non-empty Record
   * @throws error when input JSON can't be parsed
   */
  private static parseMultiValueAsRecord = (mvEnv: string): Record<string, string> => {
    try {
      return JSON.parse(mvEnv) as Record<string, string>;
    } catch (error) {
      console.log('Parsing of multivalue env variable failed');
      console.log(`Attempted to parse ${mvEnv}`);
      throw error;
    }
  };
}
