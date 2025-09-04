// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import del from 'del';

export interface CleanOptions {
  path: string;
}

/**
 * @param {CleanOptions} options
 */
export function clean(options: CleanOptions) {
  if (!options.path) {
    throw new Error('please specify path via options.path argument');
  }

  console.log(`Cleaning path ${options.path}...`);

  const paths = del.sync([`${options.path}/**`, `!${options.path}`], { force: true });

  if (paths && paths.length > 0) {
    console.log('Cleaned:\n', paths.join('\n'));
  }
}
