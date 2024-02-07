import { ResponseError } from '@sitecore-jss/sitecore-jss/types/data-fetcher';

export const getPublicUrl = (): string => {
  let url = process.env.PUBLIC_URL;

  if (url === undefined) {
    if (process.env.NETLIFY && process.env.DEPLOY_URL) return process.env.DEPLOY_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    url = 'http://localhost:3000';
  }

  // Ensure no trailing slash
  return url.replace(/\/$/, '');
};

export const isTimeoutError = (error: unknown) => {
  return (
    (error as ResponseError).response?.status === 408 || (error as Error).name === 'AbortError'
  );
};
