import chalk from 'chalk';

export const getPublicUrl = (): string => {
  let url = process.env.PUBLIC_URL;
  if (url === undefined) {
    console.warn(
      `${chalk.yellow.bold(
        'Warning:'
      )} An PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.`
    );
    url = 'http://localhost:3000';
  } else {
    try {
      new URL(url);
    } catch (error) {
      throw new Error(`The PUBLIC_URL environment variable '${url}' is not a valid URL.`);
    }
  }
  // Ensure no trailing slash
  return url.toString().replace(/\/$/, '');
};

export const getSitecoreSecurityToken = (): string => {
  const token = process.env.SITECORE_SECURITY_TOKEN;
  if (!token || token.length === 0) {
    throw new Error('The SITECORE_SECURITY_TOKEN environment variable is missing or invalid.');
  }
  return token;
};
