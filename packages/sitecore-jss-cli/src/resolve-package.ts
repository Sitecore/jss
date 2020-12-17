import resolve from 'resolve';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (): Promise<any> =>
  new Promise((resolvePromise, rejectPromise) => {
    resolve('./package.json', { basedir: process.cwd() }, (error, packageJson) => {
      if (error) {
        console.warn('No package.json could be found in the current directory.');
        rejectPromise();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        resolvePromise(require(packageJson as string));
      }
    });
  });
