import { SpawnSyncOptionsWithStringEncoding } from 'child_process';
import spawn from './spawn';

// runs a package.json script using npm
// uses yarn semantics for args (i.e. pass ['scriptname', '--myarg=value'], no -- needed)
export default function runPackageScript(
  args: string[],
  options?: SpawnSyncOptionsWithStringEncoding
) {
  // npm needs a -- delimiter before any extra args
  const npmArgs = ['run', ...args.slice(0, 1), '--', ...args.slice(1)];

  runPackageManagerCommand(npmArgs, options);
}

// runs a package.json script using yarn or npm
// uses yarn semantics for args (i.e. pass ['scriptname', '--myarg=value'], no -- needed)
export function runPackageManagerCommand(
  npmArgs: string[],
  options?: SpawnSyncOptionsWithStringEncoding
) {
  console.log(`> npm ${npmArgs.join(' ')}`);
  spawn('npm', npmArgs, options);
}
