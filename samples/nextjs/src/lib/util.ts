/**
 * Get the publicUrl.
 * This is used primarily to enable compatibility with the Sitecore Experience Editor.
 * VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
 * preview deployment has unique url, we don't know exact url.
 */
export const getPublicUrl = (): string => {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.PUBLIC_URL || '';
};
