import { ClientAppAnswer } from '../prompts/base';

type Arg = string | number | boolean;

/**
 * A base set of arguments used by CLI
 */
export type BaseArgs = {
  [key: string]: Arg | Arg[] | undefined;
  /**
   * Array of templates to be used
   */
  templates: string[];
  /**
   * Destination path
   */
  destination: string;
  /**
   * Suppress logs
   */
  silent?: boolean;
  /**
   * Use to prevent any questions related to the file system operations.
   * Default actions will be executed
   */
  force?: boolean;
  /**
   * Use to prevent any questions related to the CLI argument values.
   * Default values will be used
   */
  yes?: boolean;
  /**
   * Pre-push hook for linting check
   */
  prePushHook?: boolean;
  /**
   * Optional destination for proxy app, whether it's initialized alongside the main one or standalone
   */
  proxyAppDestination?: string;
};

/**
 * Set of arguments for the client-side app
 */
export type ClientAppArgs = BaseArgs &
  Partial<ClientAppAnswer> & {
    appPrefix?: boolean;
  };
