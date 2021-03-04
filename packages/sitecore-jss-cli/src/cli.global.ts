import cli from './cli-shared';
import * as commands from './scripts/index.global';

/**
 * implements CLI commands when executed from a globally installed node_modules folder
 */
export default function() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cli(commands as any);
}
