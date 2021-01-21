/**
 * Get the publicUrl.
 * This is used primarily to enable compatibility with the Sitecore Experience Editor.
 */
export const getPublicUrl = (): string => {
  return process.env.PUBLIC_URL || '';
};
