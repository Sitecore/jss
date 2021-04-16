import chalk from 'chalk';
import { isExperienceEditorActive, resetExperienceEditorChromes } from '@sitecore-jss/sitecore-jss';
import { NextRouter } from 'next/router';

/**
 * Get the publicUrl.
 * This is used primarily to enable compatibility with the Sitecore Experience Editor.
 * This is set to http://localhost:3000 by default.
 * VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
 * preview deployment has unique url, we don't know exact url.
 */
export const getPublicUrl = (): string => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

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

/**
 * Since Experience Editor does not support Fast Refresh:
 * 1. Subscribe on events provided by webpack.
 * 2. Reset experience editor chromes when build is finished
 * @param {boolean} [forceReload] force page reload instead of reset chromes
 * @default forceReload false
 */
export const handleExperienceEditorFastRefresh = (forceReload = false): void => {
  if (process.env.NODE_ENV !== 'development' || !isExperienceEditorActive()) {
    // Only run if development mode and Experience Editor is active
    return;
  }
  const eventSource = new window.EventSource(`${getPublicUrl()}/_next/webpack-hmr`);

  window.addEventListener('beforeunload', () => eventSource.close());

  eventSource.onopen = () => console.log('[Experience Editor Fast Refresh Listener] Online');

  eventSource.onmessage = (event) => {
    if (event.data.indexOf('{') === -1) return; // heartbeat

    const payload = JSON.parse(event.data);

    console.debug(
      `[Experience Editor Fast Refresh Listener] Saw event: ${JSON.stringify(payload)}`
    );

    if (payload.action !== 'built') return;

    if (forceReload) return window.location.reload();

    setTimeout(() => {
      console.log(
        '[Experience Editor HMR Listener] Experience Editor does not support Fast Refresh, reloading chromes...'
      );
      resetExperienceEditorChromes();
    }, 500);
  };
};

export const getJssEditingSecret = (): string => {
  const secret = process.env.JSS_EDITING_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error('The JSS_EDITING_SECRET environment variable is missing or invalid.');
  }
  return secret;
};

/**
 * Pages that are statically optimized will be hydrated without their route parameters provided.
 * After hydration, Next.js will trigger an update to your application to provide the route parameters in the query object.
 * Details could be found on Caveats section for dynamic routes in Next.js doc
 * @param {NextRouter} router to get route information
 */
export function areQueryParamsReady(router: NextRouter): boolean {
  if (!router) {
    return false;
  }
  // If path exists, then the minimum query length is 2, where 2 = 1 (path) + 1 (other parameter).
  // Otherwise, the min query length is 1 (other parameter).
  const minQueryLength = router.query.path !== undefined ? 2 : 1;

  const index = router.asPath.indexOf('?');

  return (
    index < 0 ||
    router.asPath.length === index + 1 ||
    Object.keys(router.query).length >= minQueryLength
  );
}
