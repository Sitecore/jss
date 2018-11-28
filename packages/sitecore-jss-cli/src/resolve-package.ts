import resolve from 'resolve';

export default (): Promise<any> =>
  new Promise((resolvePromise, rejectPromise) => {
    resolve('./package.json', { basedir: process.cwd() }, (error, packageJson) => {
      if (error) {
        console.warn('No package.json could be found in the current directory.');
        rejectPromise();
      } else {
        resolvePromise(require(packageJson as string));
      }
    });
  });
