// This class is used to get point of sale identifier(s). Resolving from env variable, but it can be expanded or change in future if needed.
export class PosResolver {
  /**
   * Resolve point of sale by locale
   * @param {string} locale
   * @returns {string}
   */
  static resolve = (locale: string): string => {
    try {
      // POS can be multi-valued (one entry per locale) or single valued so we parse it
      // POS must be valid in order to save events (domain name might be taken but it must be defined in CDP settings)
      const parsedPos = PosResolver.parseEnvValue(process.env.NEXT_PUBLIC_CDP_POINTOFSALE);
      if (typeof parsedPos == 'string') return parsedPos;
      else return parsedPos[locale];
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  /**
   * Entry method to parse multi or single value env variables
   * @param {string} envValue - can be undefined when providing values via process.env
   * @returns Record or string depending on input format
   */
  private static parseEnvValue = (envValue?: string): Record<string, string> | string => {
    if (!envValue) {
      return '';
    }
    if (envValue.startsWith('{') && envValue.endsWith('}')) {
      return PosResolver.parseMultiValueAsRecord(envValue);
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
