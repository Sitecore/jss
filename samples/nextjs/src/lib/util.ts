/**
 * Get the publicUrl.
 * This is used primarily to enable compatibility with the Sitecore Experience Editor.
 */
export const getPublicUrl = (): string => {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.PUBLIC_URL || '';
};
