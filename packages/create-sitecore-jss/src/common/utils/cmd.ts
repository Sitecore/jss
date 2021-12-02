import spawn from 'cross-spawn';
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';

/**
 * @param command
 * @param args
 * @param options
 */
export const run = (
  command: string,
  args: string[],
  options?: SpawnSyncOptionsWithStringEncoding
) => {
  console.log(`> ${command} ${args.join(' ')}`);
  spawnFunc(command, args, options);
};

/**
 * @param {string} command
 * @param {string[]} args
 * @param {SpawnSyncOptionsWithStringEncoding} options
 */
export const spawnFunc = (
  command: string,
  args: string[],
  options?: SpawnSyncOptionsWithStringEncoding
) => {
  const result = spawn.sync(command, args, Object.assign({ stdio: 'inherit' }, options));

  if (result.signal === 'SIGKILL') {
    console.log(
      'The operation failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The operation failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  }

  if (result.status && result.status > 0) {
    process.exit(result.status);
  }
};
