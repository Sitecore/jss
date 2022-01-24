import chalk from 'chalk';
import { isEditorActive, resetEditorChromes } from '@sitecore-jss/sitecore-jss/utils';

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
 * Since Sitecore editors do not support Fast Refresh:
 * 1. Subscribe on events provided by webpack.
 * 2. Reset editor chromes when build is finished
 * @param {boolean} [forceReload] force page reload instead of reset chromes
 * @default forceReload false
 */
export const handleEditorFastRefresh = (forceReload = false): void => {
  if (process.env.NODE_ENV !== 'development' || !isEditorActive()) {
    // Only run if development mode and editor is active
    return;
  }
  const eventSource = new window.EventSource(`${getPublicUrl()}/_next/webpack-hmr`);

  window.addEventListener('beforeunload', () => eventSource.close());

  eventSource.onopen = () => console.log('[Sitecore Editor Fast Refresh Listener] Online');

  eventSource.onmessage = (event) => {
    if (event.data.indexOf('{') === -1) return; // heartbeat

    const payload = JSON.parse(event.data);

    console.debug(`[Sitecore Editor Fast Refresh Listener] Saw event: ${JSON.stringify(payload)}`);

    if (payload.action !== 'built') return;

    if (forceReload) return window.location.reload();

    setTimeout(() => {
      console.log(
        '[Sitecore Editor HMR Listener] Sitecore editor does not support Fast Refresh, reloading chromes...'
      );
      resetEditorChromes();
    }, 500);
  };
};

/**
 * Since Sitecore editors do not support Fast Refresh:
 * 1. Subscribe on events provided by webpack.
 * 2. Reset editor chromes when build is finished
 * @deprecated Will be removed in a future release. Please use handleEditorFastRefresh instead.
 * @param {boolean} [forceReload] force page reload instead of reset chromes
 * @default forceReload false
 */
export const handleExperienceEditorFastRefresh = handleEditorFastRefresh;

export const getJssEditingSecret = (): string => {
  const secret = process.env.JSS_EDITING_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error('The JSS_EDITING_SECRET environment variable is missing or invalid.');
  }
  return secret;
};
