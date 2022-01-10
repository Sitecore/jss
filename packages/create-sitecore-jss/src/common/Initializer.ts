import { BaseArgs } from './args/base';

export interface InitializerResults {
  appName: string;
  initializers?: string[];
  nextSteps?: string[];
}

/**
 * Initializer base type
 */
export interface Initializer {
  /**
   * The initializer is base if the app can't be started without an appropriate template
   */
  isBase: boolean;
  /**
   * Entrypoint for initializer
   * @param {BaseArgs} args CLI arguments
   */
  init: (args: BaseArgs) => Promise<InitializerResults>;
}
