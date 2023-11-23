import { isEditorActive, resetEditorChromes } from '@sitecore-jss/sitecore-jss/utils';

/**
 * Get the publicUrl.
 * This is used primarily to enable compatibility with Sitecore editors.
 * This is set to http://localhost:3000 by default.
 * VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
 * preview deployment has unique url, we don't know exact url.
 * Similarly, DEPLOY_URL is provided by Netlify and would give us the deploy URL
 * In production non-editing environments it is desirable to use relative urls, so in that case set PUBLIC_URL = ''
 */
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

export const getJssEditingSecret = (): string => {
  const secret = process.env.JSS_EDITING_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error('The JSS_EDITING_SECRET environment variable is missing or invalid.');
  }
  return secret;
};
