import chalk from 'chalk';

export const getPublicUrl = (): string => {
  let url = process.env.EDITING_HOST_PUBLIC_URL;
  if (url === undefined) {
    console.warn(
      `${chalk.yellow.bold(
        'Warning:'
      )} An EDITING_HOST_PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.`
    );
    url = 'http://localhost:3000';
  } else {
    try {
      new URL(url);
    } catch (error) {
      throw new Error(
        `The EDITING_HOST_PUBLIC_URL environment variable '${url}' is not a valid URL.`
      );
    }
  }
  // Ensure no trailing slash
  return url.toString().replace(/\/$/, '');
};
