/**
 * Get the publicUrl.
 * By default, this will only be present for Editing Host builds (using the EDITING_HOST_PUBLIC_URL environment variable).
 */
export const getPublicUrl = (): string => {
  return process.env.publicUrl || '';
};
